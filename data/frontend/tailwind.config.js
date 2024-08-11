// eslint-disable-next-line no-undef
const withMT = require('@material-tailwind/react/utils/withMT');

// eslint-disable-next-line no-undef
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
        'home-red': 'url(/assets/tetris-hd-red.png)',
        'home-blue': 'url(/assets/tetris-hd-blue.jpg)',
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
          W: 'rgb(var(--W) / <alpha-value>)',
          DEFAULT: 'rgb(78 78 78 / <alpha-value>)',
        },
        board: 'rgba(0,0,0,0.7)',
        'dark-red': '#960F0FFF',
        'light-red': '#F70000FF',
      },
      boxShadow: {
        ghost: '0 0 20px 4px rgba(0, 0, 0, 0.3)',
        tile: {
          I: '0 0 1px 5px rgb(var(--I) / <alpha-value>)',
          O: '0 0 1px 5px rgb(var(--O) / <alpha-value>)',
          T: '0 0 1px 5px rgb(var(--T) / <alpha-value>)',
          L: '0 0 1px 5px rgb(var(--L) / <alpha-value>)',
          J: '0 0 1px 5px rgb(var(--J) / <alpha-value>)',
          S: '0 0 1px 5px rgb(var(--S) / <alpha-value>)',
          Z: '0 0 1px 5px rgb(var(--Z) / <alpha-value>)',
          W: '0 0 1px 5px rgb(var(--W) / <alpha-value>)',
        },
      },
      borderWidth: {
        tile: 'var(--shadow-size)',
      },
      size: {
        tile: 'var(--tile-size)',
      },
    },
  },
  plugins: [],
});
