import type { SubjectFile } from "@/lib/files";

const extIcon: Record<string, string> = {
  PDF: "📄",
  PPTX: "📊",
  PPT: "📊",
  DOCX: "📝",
  DOC: "📝",
  XLSX: "📈",
  XLS: "📈",
  ZIP: "🗂️",
};

export default function FileRow({ file, index }: { file: SubjectFile; index: number }) {
  return (
    <a
      href={file.href}
      download
      className="group flex items-center gap-4 rounded-md border border-khaki/30 bg-paper px-5 py-4 hover:border-brass hover:bg-brassLight/10 transition-colors"
    >
      <span className="font-mono text-xs text-khaki w-6 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-xl shrink-0" aria-hidden>
        {extIcon[file.ext] ?? "📁"}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-ink font-medium truncate">{file.name}</span>
        <span className="block text-xs text-khaki font-mono mt-0.5">
          {file.ext} · {file.sizeLabel}
        </span>
      </span>
      <span className="shrink-0 flex items-center gap-2 text-brass text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        ดาวน์โหลด
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8m0 0-3-3m3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
