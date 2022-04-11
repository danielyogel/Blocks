/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      height: {
        90: '21rem',
        128: '32rem',
        240: '60rem'
      },
      maxHeight: { '90vh': '90vh' },
      width: {
        200: '50rem',
        '80vw': '80vw'
      },
      maxWidth: {
        xxxs: '12rem'
      },
      fontSize: {
        xl: ['1.25rem', '1.5rem']
      },
      transitionProperty: {
        width: 'width'
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(0.5, 1, 0.89, 1)'
      }
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      primary: '#07C597',

      secondary: {
        DEFAULT: '#f8fafe'
      },

      danger: {
        DEFAULT: '#EC4899',
        light: '#fad8e9'
      },

      black: '#0F0F0F',
      white: 'white',
      'white-transparent': 'rgba(255, 255, 255, 0.5)',

      gray: {
        darkest: '#1f2d3d',
        dark: '#757575',
        DEFAULT: '#c0ccda',
        light: '#e0e6ed',
        lightest: '#f9fafc'
      }
    },
    fontFamily: {
      primary: ['Inter', 'sans-serif']
    }
  },
  plugins: []
};
