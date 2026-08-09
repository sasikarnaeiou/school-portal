import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "เอกสารการประกอบการเรียน | โรงเรียนแผนที่ กรมแผนที่ทหาร",
  description:
    "สำหรับนักเรียนนายสิบแผนที่ ชั้นปีที่ 1 และ 2 เลือกรายวิชาเพื่อดาวน์โหลดเอกสาร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${chakra.variable} ${plexThai.variable} ${mono.variable}`}>
      <body className="font-body min-h-screen">{children}</body>
    </html>
  );
}
