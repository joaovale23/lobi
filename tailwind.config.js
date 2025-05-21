/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- isso aqui é essencial
  ],
  theme: {
    extend: {
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
      },
      fontFamily: {
        doto: ['Doto', 'sans-serif'],
      },
    }
  } ,
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.rotate-x-30': {
          transform: 'rotateX(30deg)',
        },
        '.rotate-x-45': {
          transform: 'rotateX(45deg)',
        },
        '.rotate-x-90': {
          transform: 'rotateX(90deg)',
        },
        '.rotate-y-30': {
          transform: 'rotateY(30deg)',
        },
        '.rotate-y-45': {
          transform: 'rotateY(-10deg) rotate(1deg)',
        },
        '.rotate-y-90': {
          transform: 'rotateY(90deg)',
        },
        // Adicione transform-style e perspective se quiser ver profundidade
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.perspective-750': {
          perspective: '750px',
        },
      };

      addUtilities(newUtilities, ['responsive']);
    }
  ],
}

