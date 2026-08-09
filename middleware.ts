import { NextRequest, NextResponse } from "next/server";
import { verifyToken, cookieNameForYear, type Year } from "@/lib/auth";

// ป้องกันทั้งหน้าเว็บ (/year/1, /year/2, ...) และไฟล์เอกสารจริง (/files/1/..., /files/2/...)
// เพื่อไม่ให้ใครดาวน์โหลดไฟล์ได้จาก URL ตรง ๆ โดยไม่ผ่านรหัสผ่าน
export const config = {
  matcher: ["/year/:path*", "/files/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/(?:year|files)\/(1|2)(?:\/|$)/);
  if (!match) return NextResponse.next();

  const year = match[1] as Year;
  const secret = process.env.AUTH_SECRET;

  // ถ้ายังไม่ได้ตั้งค่า AUTH_SECRET ใน .env.local ให้บล็อกไว้ก่อนเพื่อความปลอดภัย
  // (ดูวิธีตั้งค่าใน README.md)
  if (!secret) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("year", year);
    loginUrl.searchParams.set("next", pathname);
    loginUrl.searchParams.set("misconfigured", "1");
    return NextResponse.redirect(loginUrl);
  }

  const token = request.cookies.get(cookieNameForYear(year))?.value;
  const isValid = await verifyToken(token, year, secret);

  if (!isValid) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("year", year);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
