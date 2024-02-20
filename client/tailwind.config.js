/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in-bottom":
          "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "text-focus-in":
          "text-focus-in 3s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "tracking-in-expand-fwd-top":
          "tracking-in-expand-fwd-top 2s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both"
      },
      keyframes: {
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "text-focus-in": {
          "0%": {
            filter: "blur(12px)",
            opacity: "0"
          },
          to: {
            filter: "blur(0)",
            opacity: "1"
          }
        },
        "tracking-in-expand-fwd-top": {
          "0%": {
            "letter-spacing": "-.5em",
            transform: "translateZ(-700px) translateY(-500px)",
            opacity: "0"
          },
          "40%": {
            opacity: ".6"
          },
          to: {
            transform: "translateZ(0) translateY(0)",
            opacity: "1"
          }
        }
      },
    },
  },
  plugins: [],
};