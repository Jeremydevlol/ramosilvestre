/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#E8B4B8",
          light: "#F2D5D8",
          dark: "#D49599",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          translucent: "rgba(255, 255, 255, 0.9)",
          muted: "rgba(255, 255, 255, 0.7)",
        },
        customPink: {
          50: "#FDF5F6",
          100: "#FBEBEC",
          200: "#F6D7D9",
          300: "#F0C3C6",
          400: "#EBAFB3",
          500: "#E8B4B8", // Main brand color
          600: "#D49599",
          700: "#BF767A",
          800: "#AA575C",
          900: "#95383D",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
}

