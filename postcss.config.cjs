// CRITICAL: .cjs extension enables this CommonJS syntax to resolve Tailwind
module.exports = {
  plugins: [
    require('tailwindcss'), 
    require('autoprefixer'), 
  ],
};