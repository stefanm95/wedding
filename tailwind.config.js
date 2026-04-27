export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#0E0E0E",
          soft: "#141414",
        },

        paper: {
          base: "#FDFBF7",
          warm: "#F4EFE6",
          soft: "#E9E1D4",
        },

        ink: {
          dark: "#1C1A18",
          soft: "#4B463F",
          muted: "#7A746B",
        },

        accent: {
          wine: "#6E2A33",
          rose: "#A35C63",
        },

        gold: {
          DEFAULT: "#C6A96B",
          soft: "#E7D7A8",
          light: "#F3E7C6",
        },

        seam: {
          light: "rgba(255,255,255,0.7)",
          glow: "rgba(255,255,255,0.35)",
        },

        border: {
          subtle: "rgba(0,0,0,0.08)",
        },
      },

      fontFamily: {
        display: ["Cormorant Garamond", "Canela", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
