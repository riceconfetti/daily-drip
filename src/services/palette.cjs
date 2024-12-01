const getPixels = require("get-pixels")
const fs = require('fs')
const { extractColors } = require("extract-colors")
const ProxyService = require('./imgproxy.cjs')
require('dotenv').config()

async function getData(path) {
    const url = "https://cms.dailydrip.news/" + path;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + process.env.DIRECTUS_TOKEN
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error.message);
    }
}

async function updateData(path, obj) {
  const url = "https://cms.dailydrip.news/" + path;
  try {
    console.log(JSON.stringify(obj))
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.DIRECTUS_TOKEN
      },
      body: JSON.stringify(obj)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);  
} catch (error) {
    console.error(error.message);
  }
}

getData('items/characters').then(characters=> {  

characters.data.forEach((c) => {
  const path = "/characters/" + c.game + "/" + c.id + "/gachaSplash.webp";
  const src = ProxyService.getImage(path, [{key:"resize", params: ["fit", "1000", "1000"]}], 'png');
  
  const options = {
    pixels: 60000,
    distance: 0.22,
    saturationDistance: 0.6,
    lightnessDistance: 0.2,
    hueDistance: 0.083333333
  }
  
  getPixels(src, (err, pixels) => {
    if(!err) {
      const data = [...pixels.data]
      const [width, height] = pixels.shape
  
      extractColors({ data, width, height }, options)
        .then(col => {
          let colors = col.slice(0, 3)

          let dataColors = {
            colors: {
            secondary: colors[0].hex,
            primary: colors[2].hex, 
            accent: colors[1].hex,
          }
        }

          updateData('items/characters/'+c.id, dataColors);

        })
        .catch(console.log)
    }
  })
})

}).catch(err=>{console.log(err)})






