/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obscure': {
          100:'#343541',
          500:'#202123'
        },
      }
    },
  },
  plugins: [],
}
