import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "welcome":"url('/preview.jpg')",
      },
      backgroundColor: {
        "rose01":"#f200ab",
        "rose02":"#ff86f7",
        "bleu01":"#03aafc",
        "bleu02":"#07c5f4",
        "vert01":"#88f744",
        "vert02":"#13d763",
        "dark-m":"#242424",
        "light-m":"#F7F7F7",
      },
      colors: {
        "trose01":"#f200ab",
        "trose02":"#ff86f7",
        "tbleu01":"#03aafc",
        "tbleu02":"#07c5f4",
        "tvert01":"#88f744",
        "tvert02":"#13d763",

      },
      screens: {
        xs: '400px',
        '3xl':'1680px',
        '4xl': '2200px'
      },
      fontFamily:{
          lazer:['benjamin', 'sans-serif'],
          digital:["digital","sans-serif"],
          digital01:["digital","sans-serif"],
      },
    },
  },

  plugins: [],
};
export default config;
