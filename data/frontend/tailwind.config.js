const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-107': 'linear-gradient(107deg, var(--tw-gradient-stops))'
      },
      colors: {
        'tile': {
          'I': '#00ffff',
          'O': '#ffff00',
          'T': '#800080',
          'L': '#ff7f00',
          'J': '#0000ff',
          'S': '#00ff00',
          'Z': '#ff0000',
          DEFAULT: '#7f7f7f',
        },
        'dark-red': '#960F0FFF',
        'light-red': '#F70000FF',
      },
      size: {
        'tile': 'var(--tile-size)',
      }
    },
  },
  plugins: [],
});

