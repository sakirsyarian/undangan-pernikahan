/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        title: "#312C1A",
        main: "#605E5C",
        accent: "#d4ae5f",
        button: "#AE967F",
        primary: "#faf7f0",
        secondary: "#E1DCD7",
      },
      fontFamily: {
        heading: ['Whisper', 'serif'],
        'sub-heading': ['Saira Condensed', 'serif'],
        wish: ['Dancing Script', 'cursive'],
        body: ['Saira Semi Condensed', 'sans-serif']
      }
    },
  },
  plugins: [],
};