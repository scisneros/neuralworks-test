/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        primary: {
          DEFAULT: "#ee0171",
          50: "#fef2f8",
          100: "#fde6f1",
          200: "f899c6",
          300: "f567aa",
          400: "f1348d",
          500: "#ee0171",
          600: "#d60166",
          700: "#be015a",
          800: "#8f0144",
          900: "#770139",
          950: "#470022",
        },
      },
    },
  },
  plugins: [],
}

