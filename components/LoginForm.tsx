"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({
  year,
  next,
}: {
  year: "1" | "2";
  next: string;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, password }),
      });

      if (res.ok) {
        router.push(next);
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.error === "server_not_configured") {
        setError("ระบบยังไม่ได้ตั้งค่ารหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ");
      } else {
        setError("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      }
    } catch {
      setError("เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-mono tracking-widest uppercase text-khaki mb-2"
        >
          รหัสผ่าน
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-khaki/40 bg-white/60 px-4 py-2.5 text-ink outline-none focus:border-brass focus:ring-2 focus:ring-brass/30 transition"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-md bg-forest text-paper font-medium py-2.5 hover:bg-forestDeep transition-colors disabled:opacity-60"
      >
        {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
