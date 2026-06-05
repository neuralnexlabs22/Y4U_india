import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",
        "primary-accent": "var(--primary-accent)",
        "secondary-accent": "var(--secondary-accent)",
        "text-dark": "var(--text-dark)",
        "text-brown": "var(--text-brown)",
        "text-light": "var(--text-light)",
        background: "var(--primary-bg)",
        foreground: "var(--text-dark)",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
