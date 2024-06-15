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

let characters = fs.readdirSync("./src/content/characters/starrail");

characters.forEach((c) => {
  fs.readFile(
    `./src/content/characters/starrail/${c}`,
    "utf8",
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      let character = JSON.parse(data);

      if (character.splashArt) {
        delete character.splashArt;
      }

      if (
        character.images == undefined ||
        character.images.gachaSplash.endsWith(".png")
      ) {
        character.images = {
          gachaSplash: `/assets/characters/starrail/${character.name
            .toLowerCase()
            .replace(
              /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
              ""
            )}/gachaSpash`,
          gachaCard: `/assets/characters/starrail/${character.name
            .toLowerCase()
            .replace(
              /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
              ""
            )}/gachaCard`,
          bannerCard: `/assets/characters/starrail/${character.name
            .toLowerCase()
            .replace(
              /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
              ""
            )}/bannerCard`,
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
        `./src/content/characters/starrail/${c}`,
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

// let weapons = [
//   "Favonius Sword",
//   "The Flute",
//   "Sacrificial Sword",
//   "Royal Longsword",
//   "Lion's Roar",
//   "Prototype Rancour",
//   "Iron Sting",
//   "Blackcliff Longsword",
//   "The Black Sword",
//   "The Alley Flash",
//   "Sword of Descension",
//   "Festering Desire",
//   "Amenoma Kageuchi",
//   "Cinnabar Spindle",
//   "Kagotsurube Isshin",
//   "Sapwood Blade",
//   "Xiphos' Moonlight",
//   "Toukabou Shigure",
//   "Wolf-Fang",
//   "Finale of the Deep",
//   "Fleuve Cendre Ferryman",
//   "The Dockhand's Assistant",
//   "Sword of Narzissenkreuz",
// ];
// let type = "sword";
// let rarity = 4;

// weapons.forEach((w) => {
//   let weapon = {
//     name: w,
//     rarity: rarity,
//     weaponType: type,
//     icon: `./images/weapons/${w.replace(
//       /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
//       "",
//     )}.webp`,
//   };

//   fs.writeFile(
//     `./src/content/weapons/starrail/${w.replace(
//       /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
//       "",
//     )}.json`,
//     JSON.stringify(weapon),
//     (err) => {
//       if (err) {
//         console.error(err);
//       }
//     },
//   );
// });
