import type { Config } from "tailwindcss";
import Business from "./app/business/page";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightBlue: '#D1E9F6',
        lightPurple: '#D2E0FB',
        lightSky: '#BFECFF',
        lightYellow: '#FFF8C9',
      },
      height: {
        '26': '4rem',
        '76': '20rem',
        '100': '35rem',
      },
      width: {
        '100': '40rem'
      }
    },
  },
  plugins: [require('daisyui'),],
};
export default config;
