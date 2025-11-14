/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'habit-primary': '#4f46e5',
      },
    },
  },

  plugins: [
    require("daisyui"),
  ],

  daisyui: {
    themes: ["light", "dark", "cupcake", "valentine", "aqua"],
  },
};
