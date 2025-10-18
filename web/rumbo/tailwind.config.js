/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "rumbo-red": "#D5513C", // Corresponde a d5513cff
        "amarillo-degradado": "#F4B73B", // Corresponde a f4b73bff
        "background-light": "#F8FAFC",
        "background-dark": "#0B1120",
        "card-light": "#FFFFFF",
        "card-dark": "#1E293B",
        "text-light": "#1E293B",
        "text-dark": "#E2E8F0",
        "subtext-light": "#64748B",
        "subtext-dark": "#94A3B8",
        "accent-orange": "#F97316",
        "accent-green": "#22C55E",
        "accent-blue": "#3B82F6",
      },
      backgroundImage: {
        // Clase de utilidad bg-degradado
        degradado: "linear-gradient(to right, #D5513C, #F4B73B)",
      },
    },
  },
  plugins: [],
};
