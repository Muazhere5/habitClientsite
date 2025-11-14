/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'habit-primary': '#4f46e5', // Custom color definition
        },
    },
  },
  plugins: [
    require("daisyui"), 
  ],
  
  daisyui: {
    themes: ["light", "dark", "cupcake", "valentine", "aqua"],
  },
}