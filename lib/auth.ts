/**
 * ระบบตรวจสอบรหัสผ่านแบบง่าย แยกตามชั้นปี (ไม่มีฐานข้อมูล/บัญชีผู้ใช้)
 *
 * แนวคิด: เมื่อผู้ใช้กรอกรหัสผ่านถูกต้อง ระบบจะออก "token" ที่เซ็นชื่อด้วย HMAC-SHA256
 * เก็บไว้ใน cookie (httpOnly) รูปแบบ token คือ `${year}.${expiresAtMs}.${signatureHex}`
 * เมื่อมีการเข้าหน้า/ไฟล์ที่ป้องกันไว้ middleware จะตรวจลายเซ็นและวันหมดอายุ
 * โดยไม่ต้องพึ่งฐานข้อมูลใด ๆ — ใช้ค่า AUTH_SECRET จาก .env.local เป็นกุญแจลับ
 *
 * ใช้ Web Crypto API (crypto.subtle) ล้วน ๆ เพื่อให้ทำงานได้เหมือนกันทั้งบน
 * Edge Runtime (middleware) และ Edge API Route (/api/login) โดยไม่ต้องพึ่ง Node 'crypto'
 */

export type Year = "1" | "2";

const encoder = new TextEncoder();

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createToken(
  year: Year,
  secret: string,
  ttlSeconds: number
): Promise<string> {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  const payload = `${year}.${expiresAt}`;
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifyToken(
  token: string | undefined,
  year: Year,
  secret: string
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [tokenYear, expiresAtStr, signatureHex] = parts;
  if (tokenYear !== year) return false;

  const expiresAt = Number(expiresAtStr);
  if (!expiresAt || Date.now() > expiresAt) return false;

  const payload = `${tokenYear}.${expiresAtStr}`;
  const key = await getKey(secret);
  const expectedSignature = toHex(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
  );

  return timingSafeEqual(expectedSignature, signatureHex);
}

export function cookieNameForYear(year: Year): string {
  return `auth_year${year}`;
}
