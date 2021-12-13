module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "main-100": "#333333",
        "main-200": "#282828",
        "main-300": "#202020",
      },
      width: {
        "w-fit": "fit-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
