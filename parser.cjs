const fs = require("fs");

// fs.readFile("./characters.json", "utf8", function (err, data) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   let characters = JSON.parse(data);

//   characters.forEach((c) => {
//     let name = c.name.toLowerCase().replace(/[^A-Z0-9]+/gi, "");
//     fs.writeFile(
//       "./src/content/characters/" + name + ".json",
//       JSON.stringify(c),
//       (err) => {
//         if (err) {
//           console.error(err);
//         }
//       }
//     );
//   });
// });

let characters = fs.readdirSync("./src/content/characters/genshin/");

characters.forEach((c) => {
  fs.readFile(
    `./src/content/characters/genshin/${c}`,
    "utf8",
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      let character = JSON.parse(data);

      if (character.images == undefined) {
        character.images = {
          gachaSplash: `./images/characters/genshin/${character.name.toLowerCase()}/gachaSpash.png`,
          gachaCard: `./images/characters/genshin/${character.name.toLowerCase()}/gachaCard.png`,
          bannerCard: `./images/characters/genshin/${character.name.toLowerCase()}/bannerCard.png`,
        };
      }

      if (character.rarity == 5 && character.colors == undefined) {
        character.colors = {
          primary: "bg-gradient-to-r from-[#000] to-[#fff]",
          secondary: "bg-gradient-to-t from-[#000] to-[#ffffff00]",
          textAccent: "text-[#999]",
        };
      }

      fs.writeFile(
        `./src/content/characters/genshin/${c}`,
        JSON.stringify(character),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
  );
});
