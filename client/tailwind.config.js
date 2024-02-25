/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in-bottom":
          "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "text-focus-in":
          "text-focus-in 2s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "tracking-in-expand-fwd-top":
          "tracking-in-expand-fwd-top 2s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "text-flicker-in-glow":
          "text-flicker-in-glow 4s linear   both",
        "tracking-in-expand":
          "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
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
        },
        "text-flicker-in-glow": {
          "0%": {
            opacity: "0"
          },
          "10%,10.2%,20%,20.6%,30%,30.6%,45%,55.1%,57%,60.1%,65%,75.1%,77%,85.1%,86%": {
            opacity: "0",
            "text-shadow": "none"
          },
          "10.1%": {
            opacity: "1",
            "text-shadow": "none"
          },
          "20.1%": {
            opacity: "1",
            "text-shadow": "0 0 30px rgba(255, 255, 255, .25)"
          },
          "30.1%,30.5%,45.1%,50%,55%": {
            opacity: "1",
            "text-shadow": "0 0 30px rgba(255, 255, 255, .45), 0 0 60px rgba(255, 255, 255, .25)"
          },
          "57.1%,60%": {
            opacity: "1",
            "text-shadow": "0 0 30px rgba(255, 255, 255, .55), 0 0 60px rgba(255, 255, 255, .35)"
          },
          "65.1%,75%": {
            opacity: "1",
            "text-shadow": "0 0 30px rgba(255, 255, 255, .55), 0 0 60px rgba(255, 255, 255, .35), 0 0 100px rgba(255, 255, 255, .1)"
          },
          "77.1%,85%": {
            opacity: "1",
            "text-shadow": "0 0 30px rgba(255, 255, 255, .55), 0 0 60px rgba(255, 255, 255, .4), 0 0 110px rgba(255, 255, 255, .2), 0 0 100px rgba(255, 255, 255, .1)"
          },
          "86.1%,to": {
            opacity: "1",
            "text-shadow": "0 0 30px rgba(255, 255, 255, .6), 0 0 60px rgba(255, 255, 255, .45), 0 0 110px rgba(255, 255, 255, .25), 0 0 100px rgba(255, 255, 255, .1)"
          }
        },
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0"
          },
          "40%": {
            opacity: ".6"
          },
          to: {
            opacity: "1"
          }
        },
      },
    },
  },
  plugins: [],
};