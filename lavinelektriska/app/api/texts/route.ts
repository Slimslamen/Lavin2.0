import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/db/server";

export async function GET() {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.from("page_text").select("text_key, text, published, updated_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // convert to a map keyed by text_key to save client work
  const map: Record<string, any> = {};
  (data ?? []).forEach((row: any) => {
    if (row?.text_key) map[row.text_key] = row;
  });

  return NextResponse.json(map);
}