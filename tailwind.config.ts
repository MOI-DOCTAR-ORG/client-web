import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        muted: "#637492",
        clinical: "#2454df",
        "clinical-deep": "#082a92",
        "clinical-soft": "#dcebff",
        "page-soft": "#f3f6fa",
      },
      boxShadow: {
        float: "0 24px 70px rgba(15, 23, 42, 0.10)",
        card: "0 16px 50px rgba(15, 23, 42, 0.08)",
        soft: "0 10px 35px rgba(36, 84, 223, 0.16)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
