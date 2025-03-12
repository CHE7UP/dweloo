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
    },
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('preline/plugin'),
    ],
  };