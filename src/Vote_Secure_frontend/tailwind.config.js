/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        main_bg_color: "#141821",
        primary_blue: "#003199",
        grad1: "#001646",
        grad2: "#191919",
      },
      backgroundColor: {
        input: "#37456580",
      },
    },
    extend: {
      colors: {
        main_bg_color: "#141821",
        primary_blue: "#003199",
        footer_t: "#10141F",
        card_bg: "#002066",
        dialogue_box:'#252F43'
      },
    },
  },
  plugins: [],
};
