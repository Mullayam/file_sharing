/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "320px",
        xs: "400px",
      },
      fontFamily: {
        fr: ["var(--font-fraunces)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        default: "1.12rem",
      },
      colors: {
        sneakpeek: "#2A303B",
        featuredbg: "rgba(254, 243, 234, 0.5)",
        coffee: "#110011",
        textHighlight: "#2B343F",
        text: "#535D6B",
        programs: "#FEF3EA",
        interests: "#FEF7F8",
        review: "#E8F5F4",
        orange: "#FD5340",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [import("tailwind-scrollbar")],
};
