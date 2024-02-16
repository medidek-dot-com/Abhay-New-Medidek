/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#1F51C6",
        c2: "#ffffff",
        c3: "#108ED6",
        c4: "#706D6D",
        c5: "#B8B8BA99",
        c6: "#D7ECF8",
        c7: "#14D61047",
        c8: "#EA43359C",
        c9: "#EA4335",
        c10: "#1F51C699",
        c11: "#353535",
        c12: "#24232387",
        c13: "#828489",
        c14: "#263238",
        c15: "#353535",
        c16: "#000000",
        c17: "#D9D9D980",
        c18: "#D9D9D9",
        c19:"#242323",
        c20:"#383838",
        c21:"#353535CC",
        c22:"#5D5E61BD",
        c23:"#1F51C6AD",
        c24:"#F23E3E"
      },
      fontFamily: {
        f1: "Playfair Display",
        f2: "Poppins",
        f3:'Lato'
      },
      fontWeight: {
        w1: 500,
        w2: 600,
        w3: 700,
      }
    },
  },
  plugins: [],
}