import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const MENU_PATH = path.join(process.cwd(), "src/data/lunch-menu.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "tunel2024";

export async function GET() {
  const data = await readFile(MENU_PATH, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Nesprávné heslo" }, { status: 401 });
  }

  const { password: _, ...menuData } = body;
  await writeFile(MENU_PATH, JSON.stringify(menuData, null, 2), "utf-8");

  return NextResponse.json({ ok: true });
}
