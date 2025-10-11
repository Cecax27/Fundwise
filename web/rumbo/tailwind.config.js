/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rumbo-red': '#D5513C', // Corresponde a d5513cff
        'amarillo-degradado': '#F4B73B', // Corresponde a f4b73bff
      },
      backgroundImage: {
        // Clase de utilidad bg-degradado
        'degradado': 'linear-gradient(to right, #D5513C, #F4B73B)',
      },
    },
  },
  plugins: [],
}