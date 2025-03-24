// tailwind.config.js
// module.exports = {
//     content: [
//         './node_modules/preline/preline.js',
//     ],
//     plugins: [
//         // eslint-disable-next-line @typescript-eslint/no-require-imports
//         require('preline/plugin'),
//     ],
//   }

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './node_modules/preline/preline.js',
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'prompt': ["var(--font-prompt)", 'system-ui'] // Added Prompt font
        },
      },
      animation: {
        'fadeout': 'fadeout 2s ease-in-out forwards',
    },
      keyframes: {
        fadeout: {
          '0%': { opacity: 1 },
          '90%': { opacity: 0.6 },
          '100%': { opacity: 0 },
        },
      },
    },
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('preline/plugin'),
    ],
  };