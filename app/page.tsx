import Link from "next/link";
import Header from "@/components/Header";
import { years } from "@/lib/subjects";

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-brass mb-3">
          Index Sheet — เลือกชั้นปีของท่าน
        </p>
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-forest leading-tight max-w-2xl">
          เอกสารประกอบการเรียน สำหรับนักเรียนนายสิบแผนที่
        </h1>
        <p className="mt-4 text-ink/70 max-w-xl leading-relaxed">
          เลือกตามชั้นปีเพื่อดูรายวิชาและดาวน์โหลดเอกสารที่เกี่ยวข้อง
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-6">
        {years.map((y, i) => (
          <Link
            key={y.year}
            href={`/year/${y.year}`}
            className="group relative block rounded-lg bg-paper border border-khaki/40 p-8 tick-corner transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="contour-ring" />
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs tracking-[0.25em] text-khaki uppercase">
                Sector {i + 1}
              </span>
              <span className="font-mono text-xs text-brass">
                {y.subjects.length} วิชา
              </span>
            </div>
            <h2 className="font-display font-semibold text-2xl text-forest mt-6">
              {y.label}
            </h2>
            <p className="mt-2 text-sm text-ink/60">{y.subtitle}</p>
            <div className="mt-8 flex items-center gap-2 text-brass font-medium text-sm">
              เข้าสู่รายวิชา
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      <footer className="max-w-5xl mx-auto px-6 pb-10 text-xs font-mono text-khaki/80 tracking-wide">
        หลักสูตรนักเรียนนายสิบแผนที่ ชั้นปีที่ ๑ และชั้นปีที่ ๒ โรงเรียนแผนที่ กรมแผนที่ทหาร กองบัญชาการกองทัพไทย
      </footer>
    </main>
  );
}
