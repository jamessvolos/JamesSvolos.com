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
        coastal: '#5da7c9',
        coral: '#e07a5f'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
