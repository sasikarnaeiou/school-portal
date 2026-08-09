import { NextRequest, NextResponse } from "next/server";
import { createToken, cookieNameForYear, type Year } from "@/lib/auth";

// Edge runtime สำคัญมาก: ต้องตรงกับ runtime ของ middleware.ts
// เพื่อให้ crypto.subtle ทำงานเหมือนกันทั้งสองฝั่ง (สร้าง token / ตรวจ token)
export const runtime = "edge";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function POST(request: NextRequest) {
  let body: { year?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { year, password } = body;

  if (year !== "1" && year !== "2") {
    return NextResponse.json({ error: "invalid_year" }, { status: 400 });
  }
  if (!password) {
    return NextResponse.json({ error: "missing_password" }, { status: 400 });
  }

  const secret = process.env.AUTH_SECRET;
  const expectedPassword =
    year === "1" ? process.env.YEAR1_PASSWORD : process.env.YEAR2_PASSWORD;

  if (!secret || !expectedPassword) {
    return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }

  const token = await createToken(year as Year, secret, THIRTY_DAYS);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieNameForYear(year as Year), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
  return response;
}
