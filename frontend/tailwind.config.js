/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        samarkan: ['"Samarkan"', "sans-serif"], // Add your font here
      },
      animation: {
        "fade-in": "fadeIn 4s ease-in-out",
        "slide-in": "slideIn 4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        
      },
    },
  },
  plugins: [],
};
