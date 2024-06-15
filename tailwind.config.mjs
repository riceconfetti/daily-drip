/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": ".6rem",
      },
      fontFamily: {
        genshin: ['"HYImpact"', "serif"],
        starrail: ['"Bai Jamjuree"', "sans-serif"],
        reverse: ['"Playfair Display SC"', "serif"],
        wuwa: ['"Philosopher"', "serif"],
      },
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
          event: "#223267",
          default: {
            gradient: {
              from: "#464646",
              to: "#A1A1A1",
            },
          },
          anemo: {
            bg: "#5EBEA1",
            text: "#000000B3",
            gradient: {
              from: "#0F6C5C",
              to: "#44CAAA",
            },
          },
          electro: {
            bg: "#8350A1",
            text: "#000000B3",
            gradient: {
              from: "#341861",
              to: "#6A31C6",
            },
          },
          geo: {
            bg: "#C8A839",
            text: "#000000B3",
            gradient: {
              from: "#715C12",
              to: "#CEAD57",
            },
          },
          dendro: {
            bg: "#7DB26A",
            text: "#000000B3",
            gradient: {
              from: "#0D4A10",
              to: "#6EB96D",
            },
          },
          cryo: {
            bg: "#B8E3F1",
            text: "#000000B3",
            gradient: {
              from: "#0E4E7D",
              to: "#79B6CE",
            },
          },
          hydro: {
            bg: "#5F91DD",
            text: "#000000B3",
            gradient: {
              from: "#161464",
              to: "#4472CA",
            },
          },
          pyro: {
            bg: "#F25252",
            text: "#000000B3",
            gradient: {
              from: "#341402",
              to: "#A6280F",
            },
          },
        },
        starrail: {
          event: "#6D2628",
          wind: {
            gradient: {
              from: "#32693E",
              to: "#BAE9C0",
            },
          },
          lightning: {
            gradient: {
              from: "#49104B",
              to: "#E687FE",
            },
          },
          physical: {
            gradient: {
              from: "#413D3D",
              to: "#B8B8B8",
            },
          },
          fire: {
            gradient: {
              from: "#4F2B1E",
              to: "#FA8562",
            },
          },
          ice: {
            gradient: {
              from: "#218BCD",
              to: "#BDF3FF",
            },
          },
          quantum: {
            gradient: {
              from: "#32267E",
              to: "#9E9BE5",
            },
          },
          imaginary: {
            gradient: {
              from: "#C2AC16",
              to: "#FFF398",
            },
          },
        },
        reverse: {
          event: "#D48917",
        },
        wuwa: {
          event: "#464953",
        },
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
