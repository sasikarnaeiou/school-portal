import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-khaki/30">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-6">
        <Link href="/" className="flex items-center gap-4 group w-fit">
          <span className="relative shrink-0 grid place-items-center w-12 h-12 rounded-full border-2 border-forest text-forest">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeWidth="1" />
              <path d="M13 2v4M13 20v4M2 13h4M20 13h4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M13 7l2.6 4.9L20 13l-4.4 1.1L13 19l-2.6-4.9L6 13l4.4-1.1L13 7z" fill="currentColor" />
            </svg>
          </span>
          <div>
            <p className="font-display font-semibold tracking-wide text-forest text-lg leading-tight">
              คลังเอกสารการเรียน
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-khaki">
              โรงเรียนแผนที่ · กรมแผนที่ทหาร
            </p>
          </div>
        </Link>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-3 flex items-center gap-3 text-[11px] font-mono tracking-widest text-khaki uppercase">
        <span>REF. MAP-EDU-01</span>
        <span className="w-1 h-1 rounded-full bg-khaki/60" />
        <span>SCALE 1 : —</span>
        <span className="w-1 h-1 rounded-full bg-khaki/60" />
        <span>DATUM WGS84</span>
      </div>
    </header>
  );
}
