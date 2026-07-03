import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0F",
        surface: "#14141C",
        "surface-glass": "rgba(20, 20, 28, 0.6)",
        "border-hairline": "rgba(255, 255, 255, 0.08)",
        "text-primary": "#F4F3F7",
        "text-secondary": "#9C99AB",
        "accent-indigo": "#6C5CE7",
        "accent-coral": "#FF6B5B",
        "signal-mint": "#00E6A0",
        
        // shadcn compatible variable mapping
        background: "#0A0A0F",
        foreground: "#F4F3F7",
        card: {
          DEFAULT: "#14141C",
          foreground: "#F4F3F7",
        },
        popover: {
          DEFAULT: "#14141C",
          foreground: "#F4F3F7",
        },
        primary: {
          DEFAULT: "#6C5CE7",
          foreground: "#F4F3F7",
        },
        secondary: {
          DEFAULT: "#FF6B5B",
          foreground: "#0A0A0F",
        },
        muted: {
          DEFAULT: "#14141C",
          foreground: "#9C99AB",
        },
        accent: {
          DEFAULT: "#6C5CE7",
          foreground: "#F4F3F7",
        },
        destructive: {
          DEFAULT: "#FF6B5B",
          foreground: "#F4F3F7",
        },
        border: "rgba(255, 255, 255, 0.08)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "#6C5CE7",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        data: ["var(--font-data)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
