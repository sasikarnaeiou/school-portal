import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-brass mb-3">
          Off the map
        </p>
        <h1 className="font-display font-semibold text-3xl text-forest">
          ไม่พบระวางที่ท่านค้นหา
        </h1>
        <p className="mt-3 text-ink/60">หน้าที่ท่านต้องการอาจถูกย้ายหรือไม่มีอยู่</p>
        <Link
          href="/"
          className="inline-block mt-8 rounded-md border border-forest px-6 py-2.5 text-forest font-medium hover:bg-forest hover:text-paper transition-colors"
        >
          กลับหน้าแรก
        </Link>
      </section>
    </main>
  );
}
