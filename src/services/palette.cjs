const getPixels = require("get-pixels");
const { extractColors } = require("extract-colors");
const fs = require("fs");
const ProxyService = require("./imgproxy.cjs");
require("dotenv").config();

async function getData(path) {
  const url = "https://cms.dailydrip.news/" + path;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.DIRECTUS_TOKEN,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateData(path, obj) {
  const url = "https://cms.dailydrip.news/" + path;
  try {
    // console.log(JSON.stringify(obj))
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.DIRECTUS_TOKEN,
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

function getColors(c) {
  if (c.colors == null) {
    const path = "/characters/" + c.game + "/" + c.id + "/gachaSplash.webp";
    const icon = [
      { key: "trim", params: [1, "FF00FF"] },
      {
        key: "gravity",
        params: [
          "fp",
          c.focalPoint.x + Math.random() * 0.2 - 0.1,
          ,
          c.focalPoint.y + Math.random() * 0.2 - 0.1,
          ,
        ],
      },
      { key: "crop", params: [300 * c.crop.x, 300 * c.crop.y] },
      { key: "resize", params: ["fill", 200, 200] },
    ];

    const src = ProxyService.getImage(path, icon, "png");
    fs.appendFileSync("icons.txt", src + "\n");

    const options = {
      pixels: 100000,
      distance: 0.18,
      saturationDistance: 0.2,
      colorValidator: (red, green, blue, alpha = 255) =>
        !isGraytone(red, green, blue) && alpha > 250,
      lightnessDistance: 0.2,
      hueDistance: 0.083,
    };

    getPixels(src, (err, pixels) => {
      if (!err) {
        const data = [...pixels.data];
        const [width, height] = pixels.shape;

        extractColors({ data, width, height }, options)
          .then((col) => {
            let dataColors = {
              colors: col.sort((a, b) => b.area - a.area),
            };

            updateData("items/characters/" + c.id, dataColors)
              .then((x) => {
                let colors = JSON.parse(
                  fs.readFileSync("src/assets/palette.json", {
                    encoding: "utf-8",
                  }),
                );

                colors[c.id] = x.data;
                fs.writeFileSync(
                  "src/assets/palette.json",
                  JSON.stringify(colors, null, 2),
                );
              })
              .catch(console.log);
          })
          .catch(console.log);
      }
    });
  }
}

function isGraytone(r, g, b) {
  if ((r == g && r == b && r == 0) || r + g + b < 20) {
    return true;
  } else {
    const mean = (r + g + b) / 3;
    const sum2diff = (r - mean) ** 2 + (g - mean) ** 2 + (b - mean) ** 2;
    const variance = sum2diff / 3;
    const standDev = Math.sqrt(variance);
    return standDev / mean <= 0.06;
  }
}

getData("items/characters/acheron")
  .then(({ data }) => {
    // console.log(data);
    // data.forEach((c) => {
    //   getColors(c);
    // });
    getColors(data);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = getColors;
