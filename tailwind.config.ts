import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2EEE1",
        paperLine: "#E4DDC8",
        forest: "#24352A",
        forestDeep: "#182118",
        khaki: "#8A7554",
        brass: "#B08D57",
        brassLight: "#D8B57E",
        ink: "#1E2A1F",
      },
      fontFamily: {
        display: ["var(--font-chakra)", "sans-serif"],
        body: ["var(--font-plex)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        contour:
          "repeating-radial-gradient(circle at 15% 20%, transparent 0, transparent 18px, rgba(138,117,84,0.08) 19px, rgba(138,117,84,0.08) 20px)",
        grid: "linear-gradient(rgba(138,117,84,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(138,117,84,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        gridcell: "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
