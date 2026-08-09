import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import LogoutButton from "@/components/LogoutButton";
import { getYear, years } from "@/lib/subjects";

export function generateStaticParams() {
  return years.map((y) => ({ year: y.year }));
}

export default function YearPage({ params }: { params: { year: string } }) {
  const yearData = getYear(params.year);
  if (!yearData) notFound();

  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between gap-4">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: yearData.label },
          ]}
        />
        <LogoutButton year={yearData.year} />
      </div>

      <section className="max-w-5xl mx-auto px-6 pt-8 pb-8">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-brass mb-3">
          {yearData.subtitle}
        </p>
        <h1 className="font-display font-semibold text-3xl text-forest">
          รายวิชา — {yearData.label}
        </h1>
        <p className="mt-3 text-ink/70 max-w-xl leading-relaxed">
          เลือกวิชาเพื่อดูและดาวน์โหลดเอกสารประกอบการเรียน
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-5">
        {yearData.subjects.map((s) => (
          <Link
            key={s.slug}
            href={`/year/${yearData.year}/${s.slug}`}
            className="group relative block rounded-lg bg-paper border border-khaki/40 p-6 tick-corner transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="contour-ring" />
            <div className="flex items-start justify-between text-khaki font-mono text-[11px] tracking-widest uppercase">
              <span>{s.sheet}</span>
              {s.grid && <span>{s.grid}</span>}
            </div>
            <h2 className="font-display font-semibold text-xl text-forest mt-4">
              {s.name}
            </h2>
            <p className="text-xs text-khaki mt-0.5 tracking-wide">{s.nameEn}</p>
            <p className="mt-3 text-sm text-ink/60 leading-relaxed">{s.description}</p>
            <div className="mt-6 flex items-center gap-2 text-brass font-medium text-sm">
              ดูเอกสาร
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
