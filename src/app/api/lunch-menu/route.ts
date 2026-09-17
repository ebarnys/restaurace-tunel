import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "tunel2024";

export async function GET() {
  const { data, error } = await supabase
    .from("lunch_menu")
    .select("data")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return NextResponse.json({ weekLabel: "", days: [] });
  }

  return NextResponse.json(data.data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("PWD_LEN_BODY:", body.password?.length, "PWD_LEN_ENV:", ADMIN_PASSWORD.length, "MATCH:", body.password === ADMIN_PASSWORD);
  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Nesprávné heslo", debug: { bodyLen: body.password?.length, envLen: ADMIN_PASSWORD.length } }, { status: 401 });
  }

  const { password: _, ...menuData } = body;

  const { error } = await supabase
    .from("lunch_menu")
    .upsert({ id: 1, data: menuData }, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
