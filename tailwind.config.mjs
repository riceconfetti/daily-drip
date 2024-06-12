/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}"],
  theme: {
    extend: {
      colors: {
        dark: "#232323",
        light: "#D1D1D1",
        text: {
          dark: "#D1D1D1",
          light: "#232323",
        },
        accent: {
          dark: "#C19C64",
          light: "#8A6329",
        },
        genshin: {
          anemo: { bg: "#5EBEA1", text: "#000000B3" },
          electro: { bg: "#8350A1", text: "#000000B3" },
          geo: { bg: "#C8A839", text: "#000000B3" },
          dendro: { bg: "#7DB26A", text: "#000000B3" },
          cryo: { bg: "#B8E3F1", text: "#000000B3" },
          hydro: { bg: "#5F91DD", text: "#000000B3" },
          pyro: { bg: "#F25252", text: "#000000B3" },
        },
        starrail: {},
        reverse: {},
        wuwa: {},
      },
    },
  },
  plugins: [],
};
