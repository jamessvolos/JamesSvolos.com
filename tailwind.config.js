/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './lab/**/*.html',
    './about/**/*.html',
    './connect/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f8f4ed',
        coastal: '#4790b3',
        coral: '#cf6146'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
