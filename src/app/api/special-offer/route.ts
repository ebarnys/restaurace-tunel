import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "tunel2024";

export async function GET() {
  const { data, error } = await supabase
    .from("special_offer")
    .select("image_url, active")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return NextResponse.json({ active: false, image_url: null });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const password = form.get("password") as string;
    const file = form.get("image") as File;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Nesprávné heslo" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "Chybí soubor" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const filename = `offer-${Date.now()}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("special-offer")
      .upload(filename, bytes, { contentType: file.type, upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("special-offer")
      .getPublicUrl(filename);

    await supabase
      .from("special_offer")
      .update({ image_url: urlData.publicUrl, active: true })
      .eq("id", 1);

    return NextResponse.json({ ok: true, image_url: urlData.publicUrl });
  }

  // JSON — toggle active
  const body = await req.json();
  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Nesprávné heslo" }, { status: 401 });
  }

  await supabase
    .from("special_offer")
    .update({ active: body.active })
    .eq("id", 1);

  return NextResponse.json({ ok: true });
}
