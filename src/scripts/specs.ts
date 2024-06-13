import type { Phase } from "../classes/version.ts";

export function getPhase(
  game,
  data,
  number,
  eventCollection,
  characterCollection,
  weaponCollection
) {
  let phase: Phase = {
    number: number,
    date: data.startDate,
    characters: {
      fiveStars: [],
      fourStars: [],
    },
  };

  data.events.forEach((x) => {
    const event = eventCollection.find((e) => e.id == x.id);
    const inPhase =
      number === 0
        ? event.data.startDate === data.startDate
        : number === 1
        ? event.data.endDate === data.endDate
        : false;

    if (inPhase) {
      let character = characterCollection.find(
        (c) => c.id === event.data.character.id
      );
      if (character.data.rarity === 5) {
        // 5 Star
        phase.characters.fiveStars.push(character.data);
      } else {
        phase.characters.fourStars.push(character.data);
      }
    }
  });

  while (phase.characters.fiveStars.length < 2) {
    phase.characters.fiveStars.push({
      name: "????",
      rarity: 5,
      element: game,
      images: {
        gachaSplash: `./images/characters/${game}/gachaSpash.webp`,
        gachaCard: `./images/characters/${game}/gachaCard.png`,
        bannerCard: `./images/characters/${game}/bannerCard.png`,
      },
    });
  }

  while (phase.characters.fourStars.length < 3) {
    phase.characters.fourStars.push({
      name: "????",
      rarity: 4,
      element: game,
      images: {
        gachaSplash: `./images/characters/${game}/gachaSpash.webp`,
        gachaCard: `./images/characters/${game}/gachaCard.png`,
        bannerCard: `./images/characters/${game}/bannerCard.png`,
      },
    });
  }

  let w = data.weapons[number]
    ? data.weapons[number]
    : {
        fiveStars: [],
        fourStars: [],
      };
  phase.weapons = {
    fiveStars: [],
    fourStars: [],
  };

  w.fiveStars.forEach((f) => {
    let weapon = weaponCollection.find((w) => w.id === f.id);
    phase.weapons.fiveStars.push(weapon.data);
  });

  w.fourStars.forEach((f) => {
    let weapon = weaponCollection.find((w) => w.id === f.id);
    phase.weapons.fourStars.push(weapon.data);
  });

  while (phase.weapons.fiveStars.length < 2) {
    phase.weapons.fiveStars.push({
      name: "????",
      rarity: 5,
      weaponType: "default",
      icon: "./images/weapons/default/fiveStars/genshin_default.png",
    });
  }

  if (phase.weapons.fourStars.length < 5) {
    const weaponTypes = ["bow", "sword", "catalyst", "polearm", "claymore"];

    weaponTypes.forEach((weapon) => {
      const weaponTypeExists =
        phase.weapons.fourStars.find((w) => {
          w.weaponType == weapon;
        }) != undefined;
      if (!weaponTypeExists) {
        phase.weapons.fourStars.push({
          name: "????",
          rarity: 5,
          weaponType: weapon,
          icon: `./images/weapons/default/fourStars/genshin_${weapon}.png`,
        });
      }
    });
    phase.weapons.fourStars.sort((a, b) => {
      return (
        weaponTypes.indexOf(a.weaponType) - weaponTypes.indexOf(b.weaponType)
      );
    });
  }

  return phase;
}
