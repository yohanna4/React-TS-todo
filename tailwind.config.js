/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      dm: ["DM Serif Display", "sans-serif"],      
    },
    colors: {
      mainColor: "rgb(59 130 246)",
      mainColorDarker: "rgb(37 99 235)",
    },
  },
};
