import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "480px" },
      md: { max: "768px" },
      lg: { max: "980px" },
      xl: { max: "1280px" },
    },
    fontFamily: {
      sans: ["Pretendard", ...fontFamily.sans],
    },
    extend: {
      backgroundColor: {
        primary: "rgb(var(--background1) / <alpha-value>)",
        secondary: "var(--background2)",
        tertiary: "var(--background3)",
        quaternary: "var(--background4)",

        markdown: "var(--markdown-background)",
      },
      textColor: {
        primary: "var(--text1)",
        secondary: "var(--text2)",

        markdown1: "var(--markdown-text1)",
        markdown2: "var(--markdown-text2)",

        effect1: "var(--effect1)",
        effect2: "var(--effect2)",

        main: "var(--primary)",
      },
      borderColor: {
        primary: "var(--border1)",
      },
      keyframes: {
        show: {
          from: { opacity: "0", transform: "translateY(-5%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        hide: {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-5%)" },
        },
      },
      animation: {
        show: "show 150ms 0s 1 ease-in-out forwards",
        hide: "hide 150ms 0s 1 ease-in-out forwards",
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [],
};

export default config;
