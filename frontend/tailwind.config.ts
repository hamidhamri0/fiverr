import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      "2xl": { max: "1500px" },
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      "1150": { max: "1150px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "824px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "680px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "550px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      // backgroundImage: {
      //   olympic: "url('/images/olympic.webp)",
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      width: {
        "1400": "1400px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
