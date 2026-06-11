/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — disciplined: 3 brand colors + base
        teal: {
          DEFAULT: "#006D77",
          deep: "#005159",
          dark: "#003F45",
        },
        sage: {
          DEFAULT: "#83C5BE",
          soft: "#E6F2F1",
          mist: "#F4F9F8",
        },
        gold: {
          DEFAULT: "#FFB703",
          soft: "#FFF3D6",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          muted: "#5B6166",
          faint: "#8A9095",
        },
        line: "#ECECEC",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
      maxWidth: {
        content: "1140px",
      },
      borderRadius: {
        xl2: "18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04)",
        lift: "0 18px 40px -18px rgba(0,109,119,0.28)",
        soft: "0 12px 30px -16px rgba(16,24,40,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
