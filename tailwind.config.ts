import type { Config } from "tailwindcss";

/**
 * Every integer 0–100 as an opacity step, so colour modifiers such as
 * `bg-white/92` or `border-white/12` always resolve. Tailwind's JIT only
 * emits the ones actually used, so this costs nothing in the bundle.
 */
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)])
);

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F8F9F7",
        sage: {
          DEFAULT: "#DCECE5",
          light: "#EEF4F1",
          deep: "#C3DDD1",
        },
        ink: {
          DEFAULT: "#263B35",
          soft: "#3B534B",
        },
        muted: "#718078",
        accent: {
          DEFAULT: "#C69B80",
          soft: "#E3CDBE",
          deep: "#A87B5F",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 1.6rem + 4.6vw, 5rem)", { lineHeight: "1.03", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 1.5rem + 3.1vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 1.35rem + 2.1vw, 2.875rem)", { lineHeight: "1.14", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.5rem, 1.2rem + 1.2vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      opacity,
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(38,59,53,0.04), 0 8px 24px -12px rgba(38,59,53,0.12)",
        card: "0 2px 4px rgba(38,59,53,0.03), 0 18px 48px -20px rgba(38,59,53,0.18)",
        lift: "0 8px 16px rgba(38,59,53,0.05), 0 32px 72px -28px rgba(38,59,53,0.28)",
        ring: "0 0 0 1px rgba(38,59,53,0.06)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 1.8s infinite",
      },
      backgroundImage: {
        "sage-fade": "linear-gradient(180deg, #F8F9F7 0%, #EEF4F1 100%)",
        "accent-sheen": "linear-gradient(120deg, rgba(198,155,128,0) 0%, rgba(198,155,128,0.18) 50%, rgba(198,155,128,0) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
