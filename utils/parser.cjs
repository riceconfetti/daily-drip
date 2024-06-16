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

fs.readFile("utils/starrailGradients.json", "utf8", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  let gradient = JSON.parse(data);

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

        console.log(gradient);
        console.log(character.name);

        if (gradient[character.name] != undefined) {
          character.colors = {
            primary: `bg-gradient-to-r from-[${
              gradient[character.name]["P-From"]
            }] to-[${gradient[character.name]["P-To"]}]`,
            secondary: `bg-gradient-to-t from-[${
              gradient[character.name]["S-From"]
            }] to-[${gradient[character.name]["S-To"]}00]`,
            textAccent: `text-[${gradient[character.name].Text}]`,
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
});

// characters.forEach((c) => {
//   fs.readFile(
//     `./src/content/characters/wuwa/${c}`,
//     "utf8",
//     function (err, data) {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       let character = JSON.parse(data);

//       if (character.splashArt) {
//         delete character.splashArt;
//       }

//       character.images = {
//         gachaSplash: `${character.name
//           .toLowerCase()
//           .replace(
//             /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
//             ""
//           )}/gachaSpash`,
//         gachaCard: `${character.name
//           .toLowerCase()
//           .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")}/gachaCard`,
//         bannerCard: `${character.name
//           .toLowerCase()
//           .replace(
//             /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
//             ""
//           )}/bannerCard`,
//       };

//       if (character.rarity == 5 && character.colors == undefined) {
//         character.colors = {
//           primary: "bg-gradient-to-r from-[#000] to-[#fff]",
//           secondary: "bg-gradient-to-t from-[#000] to-[#ffffff00]",
//           textAccent: "text-[#999]",
//         };
//       }

//       fs.writeFile(
//         `./src/content/characters/wuwa/${c}`,
//         JSON.stringify(character),
//         (err) => {
//           if (err) {
//             console.error(err);
//           }
//         }
//       );
//     }
//   );
// });

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

// let weapons = fs.readdirSync("./src/content/weapons/starrail");

// weapons = weapons.forEach((w) => {
//   fs.readFile(
//     `./src/content/weapons/starrail/${w}`,
//     "utf8",
//     function (err, data) {
//       if (err) {
//         console.error(err);
//         return;
//       }

//       let weapon = JSON.parse(data);
//       weapon.icon = `${weapon.name.replace(
//         /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
//         ""
//       )}.webp`;

//       fs.writeFile(
//         `./src/content/weapons/starrail/${w}`,
//         JSON.stringify(weapon),
//         (err) => {
//           if (err) {
//             console.error(err);
//           }
//         }
//       );
//     }
//   );
// });
