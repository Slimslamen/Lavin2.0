import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/db/server";

type PageTextRow = { text_key?: string | null; text?: string | null };

export async function GET() {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.from("pageTexts").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // convert to an object map keyed by normalized text_key -> text
  const map: Record<string, string> = {};
  (data ?? []).forEach((row: PageTextRow) => {
    if (!row?.text_key) return;
    // normalize keys: replace non-word chars with underscore, collapse repeats, trim underscores, lowercase
    const key = String(row.text_key ?? "")
      .replace(/[^\w]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase();
    map[key] = row?.text ?? "";
  });

  return NextResponse.json(map);
}

/**
 * POST /api/texts
 * - Admin-only endpoint: requires an authenticated user present in `admins` table
 * - Body: { text_key: string, text: string, published?: boolean }
 * - Upserts the row into `pageTexts` by `text_key` and returns the upserted row
 */
export async function POST(req: Request) {
  try {
    const supabase = await supabaseServerClient();

    // ensure authenticated user
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) return NextResponse.json({ error: userErr.message }, { status: 500 });
    const user = userData.user;
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    // check admins table for this user
    const { data: admins, error: adminsErr } = await supabase.from('profiles').select('user_id').eq('user_id', user.id).limit(1);
    if (adminsErr) return NextResponse.json({ error: adminsErr.message }, { status: 500 });
    if (!admins || admins.length === 0) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const text_key = typeof body?.text_key === 'string' ? body.text_key : null;
    const text = typeof body?.text === 'string' ? body.text : null;
    const published = typeof body?.published === 'boolean' ? body.published : true;

    if (!text_key || text === null) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const row = { text_key, text, published };
    const { data: upserted, error: upsertErr } = await supabase.from('pageTexts').upsert(row, { onConflict: 'text_key' }).select().single();
    if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 });

    return NextResponse.json({ success: true, row: upserted });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}