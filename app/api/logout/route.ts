import { NextRequest, NextResponse } from "next/server";
import { cookieNameForYear, type Year } from "@/lib/auth";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  let body: { year?: string } = {};
  try {
    body = await request.json();
  } catch {
    // ไม่ส่ง year มาก็ได้ ถือว่าออกจากระบบทั้งสองปี
  }

  const response = NextResponse.json({ ok: true });

  if (body.year === "1" || body.year === "2") {
    response.cookies.delete(cookieNameForYear(body.year as Year));
  } else {
    response.cookies.delete(cookieNameForYear("1"));
    response.cookies.delete(cookieNameForYear("2"));
  }

  return response;
}
