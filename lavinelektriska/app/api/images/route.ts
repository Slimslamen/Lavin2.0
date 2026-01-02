import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/db/server";
import { isAdminUser } from "@/lib/auth/isAdmin";

function normalizeKey(input: string) {
  return String(input ?? "")
    .replace(/[^\w]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function guessExtension(mimeType: string | undefined) {
  const t = (mimeType ?? "").toLowerCase();
  if (t === "image/webp") return "webp";
  if (t === "image/png") return "png";
  if (t === "image/jpeg" || t === "image/jpg") return "jpg";
  if (t === "image/svg+xml") return "svg";
  return "bin";
}

async function getAdminWriteClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;

  const { createClient } = await import("@supabase/supabase-js");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET() {
  try {
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET ?? "page-images";
    const rootFolder = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_ROOT ?? "main";

    // Prefer service role for deterministic listing; fallback to server anon client
    const adminClient = await getAdminWriteClient();
    const client = adminClient ?? (await supabaseServerClient());

    // List top-level folders
    const { data: roots, error: listRootErr } = await client.storage
      .from(bucket)
      .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } });
    if (listRootErr) return NextResponse.json({ error: listRootErr.message }, { status: 500 });

    const map: Record<string, string> = {};

    // For each top-level folder, try two patterns:
    // 1) Direct: <image_key>/<rootFolder>/<filename>
    // 2) Grouped: <group_key>/<image_key>/<rootFolder>/<filename>
    for (const item of roots ?? []) {
      const folder = item?.name ?? "";
      if (!folder) continue;

      // Try direct structure first
      const { data: directFiles, error: directErr } = await client.storage
        .from(bucket)
        .list(`${folder}/${rootFolder}`, { limit: 1, sortBy: { column: "name", order: "desc" } });
      if (!directErr && (directFiles?.length ?? 0) > 0) {
        const file = (directFiles ?? [])[0];
        if (file?.name) {
          const path = `${folder}/${rootFolder}/${file.name}`;
          let url: string | null = null;
          if (adminClient) {
            const { data: signed } = await adminClient.storage.from(bucket).createSignedUrl(path, 60 * 60);
            url = signed?.signedUrl ?? null;
          } else {
            const { data: urlData } = client.storage.from(bucket).getPublicUrl(path);
            url = urlData?.publicUrl ?? null;
          }
          if (url) {
            const key = normalizeKey(folder);
            if (key) map[key] = url;
          }
          continue;
        }
      }

      // If not direct, try grouped structure: list subfolders under the top-level folder
      const { data: subs, error: subsErr } = await client.storage
        .from(bucket)
        .list(`${folder}`, { limit: 1000, sortBy: { column: "name", order: "asc" } });
      if (subsErr) continue;
      for (const sub of subs ?? []) {
        const subName = sub?.name ?? "";
        if (!subName) continue;
        const { data: files, error: listFilesErr } = await client.storage
          .from(bucket)
          .list(`${folder}/${subName}/${rootFolder}`, { limit: 1, sortBy: { column: "name", order: "desc" } });
        if (listFilesErr) continue;
        const file = (files ?? [])[0];
        if (!file?.name) continue;
        const path = `${folder}/${subName}/${rootFolder}/${file.name}`;
        let url: string | null = null;
        if (adminClient) {
          const { data: signed } = await adminClient.storage.from(bucket).createSignedUrl(path, 60 * 60);
          url = signed?.signedUrl ?? null;
        } else {
          const { data: urlData } = client.storage.from(bucket).getPublicUrl(path);
          url = urlData?.publicUrl ?? null;
        }
        if (!url) continue;
        const key = `${normalizeKey(folder)}_${normalizeKey(subName)}`;
        if (key) map[key] = url;
      }
    }

    return NextResponse.json(map);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/images
 * Admin-only.
 * Expects multipart/form-data:
 * - image_key: string
 * - file: File
 * - published?: "true" | "false" (optional)
 *
 * Uploads the file to Supabase Storage (public bucket) and upserts `pageImages` by `image_key`.
 */
export async function POST(req: Request) {
  try {
    const supabase = await supabaseServerClient();

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) return NextResponse.json({ error: userErr.message }, { status: 500 });
    const user = userData.user;
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const ok = await isAdminUser(supabase, user);
    if (!ok) return NextResponse.json({ error: "Forbidden. User is not admin" }, { status: 403 });

    const adminWriteClient = await getAdminWriteClient();
    if (!adminWriteClient) {
      return NextResponse.json(
        {
          error: "Server is missing SUPABASE_SERVICE_ROLE_KEY for write access",
          hint: "Set SUPABASE_SERVICE_ROLE_KEY in your server environment and restart the dev server.",
          code: "missing_service_role_key",
        },
        { status: 500 }
      );
    }

    const form = await req.formData();
    const image_key = typeof form.get("image_key") === "string" ? String(form.get("image_key")) : null;
    const group_key = typeof form.get("group_key") === "string" ? String(form.get("group_key")) : null;
    const file = form.get("file");
    if (!image_key) return NextResponse.json({ error: "Missing image_key" }, { status: 400 });
    if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 });

    const bucket = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET ?? "page-images";
    const rootFolder = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_ROOT ?? "main";
    const normalizedKey = normalizeKey(image_key);
    const normalizedGroup = group_key ? normalizeKey(group_key) : null;
    const folderPath = normalizedGroup
      ? `${normalizedGroup}/${normalizedKey}/${rootFolder}`
      : `${normalizedKey}/${rootFolder}`;

    // Remove any existing files in the folder so only the newest remains
    const { data: existing, error: listErr } = await adminWriteClient.storage
      .from(bucket)
      .list(folderPath, { limit: 1000, sortBy: { column: "name", order: "asc" } });
    if (!listErr && (existing?.length ?? 0) > 0) {
      const toRemove = (existing ?? []).map((f) => `${folderPath}/${f.name}`);
      await adminWriteClient.storage.from(bucket).remove(toRemove);
    }

    // Preserve the original filename if available
    const originalName = (file as File)?.name ?? null;
    const ext = guessExtension(file.type);
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
    const filename = originalName && originalName.trim().length > 0 ? originalName : `${Date.now()}-${id}.${ext}`;
    const path = `${folderPath}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const { error: uploadErr } = await adminWriteClient.storage
      .from(bucket)
      .upload(path, bytes, { contentType: file.type || undefined, upsert: true, cacheControl: "0" });

    if (uploadErr) {
      return NextResponse.json({ error: uploadErr.message }, { status: 500 });
    }

    // Prefer a signed URL so the client gets a fresh, unique URL token
    let url: string | null = null;
    const { data: signed } = await adminWriteClient.storage.from(bucket).createSignedUrl(path, 60 * 60);
    url = signed?.signedUrl ?? null;

    if (!url) {
      // Fallback to a public URL (filename already part of the path), no cache-busting query
      const { data: urlData } = adminWriteClient.storage.from(bucket).getPublicUrl(path);
      url = urlData?.publicUrl ?? null;
    }

    if (!url) return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });

    // Deterministic public-style URL for table storage (includes filename)
    let tableUrl: string | null = null;
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
      if (supabaseUrl) {
        tableUrl = `${new URL(supabaseUrl).origin}/storage/v1/object/public/${bucket}/${path}`;
      }
    } catch {
      tableUrl = null;
    }

    // Update pageImages so path/url reflect the latest file (no new columns, no insert)
    // If a group_key is provided, filter by both group_key and image_key.
    let tableUpdated = false;
    let tableError: string | null = null;
    try {
      const query = adminWriteClient
        .from("pageImages")
        .update({ path, url: tableUrl ?? url });

      const finalQuery = normalizedGroup
        ? query.eq("group_key", normalizedGroup).eq("image_key", normalizedKey)
        : query.eq("image_key", normalizedKey);

      const { error: updErr } = await finalQuery;
      if (!updErr) tableUpdated = true;
      else tableError = updErr.message;
    } catch (e: unknown) {
      tableError = e instanceof Error ? e.message : String(e);
    }

    // Storage-only approach: return the latest uploaded file URL for this key
    return NextResponse.json({ success: true, image_key, group_key, url, path, tableUrl, tableUpdated, tableError });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
