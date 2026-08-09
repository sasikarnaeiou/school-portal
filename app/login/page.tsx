import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { getYear } from "@/lib/subjects";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { year?: string; next?: string; misconfigured?: string };
}) {
  const year = searchParams.year === "2" ? "2" : "1";
  const yearData = getYear(year);
  const next = searchParams.next ?? `/year/${year}`;

  return (
    <main>
      <Header />
      <section className="max-w-md mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-brass mb-3 text-center">
          Restricted Sheet — ต้องยืนยันตัวตน
        </p>
        <h1 className="font-display font-semibold text-2xl text-forest text-center">
          เข้าสู่ระบบ · {yearData?.label ?? `ชั้นปีที่ ${year}`}
        </h1>
        <p className="text-sm text-ink/60 text-center mt-2">
          กรอกรหัสผ่านของ{yearData?.label ?? `ชั้นปีที่ ${year}`}เพื่อดูและดาวน์โหลดเอกสาร
        </p>

        {searchParams.misconfigured === "1" && (
          <div className="mt-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            ระบบยังไม่ได้ตั้งค่ารหัสผ่าน (AUTH_SECRET) กรุณาติดต่อผู้ดูแลระบบ
          </div>
        )}

        <div className="mt-8 rounded-lg border border-khaki/40 bg-paper p-8 tick-corner relative">
          <LoginForm year={year} next={next} />
        </div>
      </section>
    </main>
  );
}
