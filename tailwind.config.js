// tailwind.config.js
module.exports = {
    content: [
        './node_modules/preline/preline.js',
    ],
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('preline/plugin'),
    ],
  }