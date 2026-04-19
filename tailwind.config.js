/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#0b0b0b",
          soft: "#121212", // smoother alternative bg
        },

        beige: {
          light: "#f5f0e6",
          warm: "#e8dfd1",
          soft: "#d6cbb8",
        },

        accent: {
          red: "#6b1f2b",
          redSoft: "#8c2f3f",
        },

        gold: {
          DEFAULT: "#c6a96b",
          soft: "#e5d3a3",
        },

        text: {
          primary: "#f5f5f5", // for dark backgrounds
          muted: "#b3b3b3",

          dark: "#1a1a1a", // for beige backgrounds
          soft: "#4a4a4a",
        },

        border: {
          subtle: "rgba(0,0,0,0.1)",
        },
      },

      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
