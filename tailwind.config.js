/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- isso aqui é essencial
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

