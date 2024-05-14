/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "krpan-color": "var(--krpan-color)",
      },
    },
  },
  plugins: [],
}