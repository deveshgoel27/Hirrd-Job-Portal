/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",  // include .css so utilities are picked up
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
