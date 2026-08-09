import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import LogoutButton from "@/components/LogoutButton";
import FileRow from "@/components/FileRow";
import { getSubject, getYear, years } from "@/lib/subjects";
import { listSubjectFiles } from "@/lib/files";

export function generateStaticParams() {
  return years.flatMap((y) => y.subjects.map((s) => ({ year: y.year, subject: s.slug })));
}

// สำคัญ: บังคับให้หน้านี้ render ใหม่ทุกครั้งที่มีคนเข้าดู (ไม่ cache แบบ static)
// เพื่อให้ไฟล์ที่แอดมินเพิ่มเข้ามาใหม่ใน public/files/... ปรากฏได้ทันทีโดยไม่ต้อง build ใหม่
export const dynamic = "force-dynamic";

export default function SubjectPage({
  params,
}: {
  params: { year: string; subject: string };
}) {
  const yearData = getYear(params.year);
  const subject = getSubject(params.year, params.subject);
  if (!yearData || !subject) notFound();

  const files = listSubjectFiles(params.year, params.subject);

  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between gap-4">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: yearData.label, href: `/year/${yearData.year}` },
            { label: subject.name },
          ]}
        />
        <LogoutButton year={yearData.year} />
      </div>

      <section className="max-w-5xl mx-auto px-6 pt-8 pb-8">
        <div className="flex items-center gap-3 text-khaki font-mono text-xs tracking-widest uppercase mb-3">
          <span>{subject.sheet}</span>
          {subject.grid && (
            <>
              <span className="w-1 h-1 rounded-full bg-khaki/60" />
              <span>{subject.grid}</span>
            </>
          )}
        </div>
        <h1 className="font-display font-semibold text-3xl text-forest">{subject.name}</h1>
        <p className="text-sm text-khaki tracking-wide mt-1">{subject.nameEn}</p>
        <p className="mt-4 text-ink/70 max-w-xl leading-relaxed">{subject.description}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {files.length === 0 ? (
          <div className="rounded-lg border border-dashed border-khaki/40 px-6 py-14 text-center">
            <p className="text-forest font-display font-medium text-lg">ยังไม่มีเอกสารในวิชานี้</p>
            <p className="text-sm text-ink/60 mt-2">
              เมื่อผู้ดูแลระบบเพิ่มไฟล์เอกสารแล้ว รายการจะปรากฏที่นี่โดยอัตโนมัติ
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {files.map((f, i) => (
              <FileRow key={f.name} file={f} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
