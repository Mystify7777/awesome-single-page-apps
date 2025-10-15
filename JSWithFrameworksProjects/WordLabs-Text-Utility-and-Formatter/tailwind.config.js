// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors to match the dark theme
        'dark-bg': '#181b2a',
      },
    },
  },
  plugins: [],
};