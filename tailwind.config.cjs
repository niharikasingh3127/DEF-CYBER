module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        slate: {
          950: '#020617', 
        }
      }
    },
  },
  plugins: [],
}