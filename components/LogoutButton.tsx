"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({ year }: { year: "1" | "2" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year }),
    });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-xs font-mono tracking-widest uppercase text-khaki hover:text-brass transition-colors disabled:opacity-60"
    >
      {loading ? "กำลังออก..." : "ออกจากระบบ"}
    </button>
  );
}
