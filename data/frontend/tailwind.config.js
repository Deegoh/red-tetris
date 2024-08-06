const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /bg-tile-.+/,
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-107': 'linear-gradient(107deg, var(--tw-gradient-stops))',
        'home-red': 'url(./assets/tetris-hd-red.png)',
        'home-blue': 'url(./assets/tetris-hd-blue.jpg)',
      },
      colors: {
        tile: {
          I: 'rgb(var(--I) / <alpha-value>)',
          O: 'rgb(var(--O) / <alpha-value>)',
          T: 'rgb(var(--T) / <alpha-value>)',
          L: 'rgb(var(--L) / <alpha-value>)',
          J: 'rgb(var(--J) / <alpha-value>)',
          S: 'rgb(var(--S) / <alpha-value>)',
          Z: 'rgb(var(--Z) / <alpha-value>)',
          DEFAULT: 'rgb(78 78 78 / <alpha-value>)',
        },
        board: 'rgba(0,0,0,0.7)',
        'dark-red': '#960F0FFF',
        'light-red': '#F70000FF',
      },
      size: {
        tile: 'var(--tile-size)',
      },
    },
  },
  plugins: [],
})
