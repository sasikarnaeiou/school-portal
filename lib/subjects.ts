export type Subject = {
  slug: string;
  name: string;
  nameEn: string;
  sheet: string; // map-sheet style reference code, purely decorative
  grid?: string; // decorative coordinate label (ไม่บังคับใส่)
  description: string;
};

export type YearData = {
  year: "1" | "2";
  label: string;
  subtitle: string;
  subjects: Subject[];
};

/**
 * แก้ไข/เพิ่ม-ลด รายวิชาของแต่ละชั้นปีได้ที่นี่
 * ปัจจุบันกำหนดวิชาเริ่มต้นชุดเดียวกันไว้ให้ทั้งสองชั้นปี
 * สามารถแยกรายวิชาของปี 1 และปี 2 ให้ต่างกันได้โดยแก้ไข array ด้านล่าง
 */

const baseSubjects: Subject[] = [
  {
    slug: "calculus1",
    name: "แคลคูลัส ๑",
    nameEn: "Calculus 1",
    sheet: "CC 1110",
    description: "ลิมิต อนุพันธ์ อินทิกรัล และการประยุกต์ใช้ทางคณิตศาสตร์พื้นฐาน",
  },
  {
    slug: "strength-of-materials",
    name: "ความแข็งแรงวัสดุ",
    nameEn: "Strength of Materials",
    sheet: "3000-0102",
    description: "ความเค้น ความเครียด การดัด การบิด และการวิเคราะห์ความแข็งแรงของวัสดุ",
  },
  {
    slug: "engineering-mechanics",
    name: "กลศาสตร์วิศวกรรม ๑",
    nameEn: "Engineering Mechanics",
    sheet: "3100-0101",
    description: "สถิตยศาสตร์และพลศาสตร์ของวัตถุแข็งเกร็ง แรงและสมดุล",
  },
  {
    slug: "math-stats",
    name: "คณิตศาสตร์และสถิติ",
    nameEn: "Mathematics and Statistics for Careers",
    sheet: "CC 1110",
    description: "หลักสถิติ ความน่าจะเป็น และคณิตศาสตร์ประยุกต์สำหรับงานสำรวจ",
  },
];

export const years: YearData[] = [
  {
year: "1",
label: "ชั้นปีที่ ๑",
subtitle: "นักเรียนนายสิบแผนที่ ชั้นปีที่ ๑",
subjects: baseSubjects.filter(
(s) => s.slug === "calculus1" || s.slug === "math-stats"
),
},
{
year: "2",
label: "ชั้นปีที่ ๒",
subtitle: "นักเรียนนายสิบแผนที่ ชั้นปีที่ ๒",
subjects: baseSubjects.filter(
(s) =>
s.slug === "engineering-mechanics" ||
s.slug === "strength-of-materials"
),
},
];
export function getYear(year: string): YearData | undefined {
  return years.find((y) => y.year === year);
}

export function getSubject(year: string, subject: string): Subject | undefined {
  return getYear(year)?.subjects.find((s) => s.slug === subject);
}
