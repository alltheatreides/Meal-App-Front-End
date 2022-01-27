module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      height: {
        'half': '50vh',
      },
      width: {
        'third': '33.3333vw'
      },
      
    },
    colors: {
      theme: '#1B1B1B',
      'theme-darker': '#30003F',
      'theme-yellow': '#FED785',
    }
  },
  plugins: [],
}
