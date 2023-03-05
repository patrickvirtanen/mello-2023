/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        light: ["Light"],
        bolding: ["Bold"],
        reg: ["Regular"],
      },
      colors: {
        "egg-white": "#EDF5E1",
        "mello-green": "#5CDB95",
        "mello-blue": "#05386B",
      },
    },
  },
  plugins: [],
};
