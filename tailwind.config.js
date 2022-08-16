/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
