module.exports = {
  content: [
    "./client/components/**/*.{js,jsx}",
    "./client/pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
        'plus-jakarta-sans': ['Plus Jakarta Sans', 'sans-serif']
      },
      fontSize: {
        'xxs': '0.5rem'
      },
      spacing: {
        '68': '17rem',
        '84': '21rem',
        '88': '22rem',
        '116': '29rem',
        '128': '32rem',
        '144': '36rem'
      },
      minWidth: {
        '96': '24rem'
      }
    },
  },
  plugins: [],
}
