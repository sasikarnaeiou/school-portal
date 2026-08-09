import fs from "fs";
import path from "path";

export type SubjectFile = {
  name: string;
  href: string;
  sizeLabel: string;
  ext: string;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * อ่านรายชื่อไฟล์ทั้งหมดที่วางไว้ใน public/files/[year]/[subject]
 * ครูผู้สอน/แอดมิน เพียงนำไฟล์ (PDF, PPTX, DOCX ฯลฯ) ไปวางไว้ในโฟลเดอร์นี้
 * ระบบจะแสดงรายการไฟล์ให้นักเรียนดาวน์โหลดโดยอัตโนมัติ ไม่ต้องแก้โค้ด
 */
export function listSubjectFiles(year: string, subject: string): SubjectFile[] {
  const dir = path.join(process.cwd(), "public", "files", year, subject);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => !name.startsWith(".")) // ข้ามไฟล์ระบบ เช่น .gitkeep
    .map((name) => {
      const stat = fs.statSync(path.join(dir, name));
      const ext = path.extname(name).replace(".", "").toUpperCase();
      return {
        name,
        href: `/files/${year}/${subject}/${encodeURIComponent(name)}`,
        sizeLabel: formatSize(stat.size),
        ext: ext || "FILE",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "th"));
}
