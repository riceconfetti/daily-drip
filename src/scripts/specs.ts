import type { Phase } from "../classes/version.ts";
import dayjs from "dayjs";

export function getPhase(
  game,
  data,
  number,
  eventCollection,
  characterCollection,
  weaponCollection,
) {
  let phase: Phase = {
    number: number,
    date:
      number === 0
        ? data.startDate
        : dayjs(data.startDate).add(3, "week").format("YYYY-MM-DD"),
    characters: {
      fiveStars: [],
      fourStars: [],
    },
  };

  let events = eventCollection.filter((e) => {
    return (
      e.id.startsWith(`${game}/${data.version}`) && e.data.type != "chronicle"
    );
  });

  events.forEach((event) => {
    const inPhase =
      number === 0
        ? event.data.startDate === data.startDate
        : number === 1
          ? dayjs(event.data.startDate) > dayjs(data.startDate) &&
            dayjs(event.data.startDate) < dayjs(data.endDate)
          : false;

    if (inPhase) {
      let character = characterCollection.find(
        (c) => c.id === event.data.character.id,
      );
      let characterData = character.data;
      characterData.id = character.id;
      if (event.data.status === "spec") {
        characterData.spec = true;
      }
      if (character.data.rarity === 5) {
        // 5 Star
        phase.characters.fiveStars.push(characterData);
      } else {
        phase.characters.fourStars.push(characterData);
      }
    }
  });

  let simBanners = game == "wuwa" ? 1 : 2;

  while (phase.characters.fiveStars.length < simBanners) {
    phase.characters.fiveStars.push({
      name: "????",
      rarity: 5,
      bannerName: "????",
      element: game,
      weaponType: game,
      images: {
        gachaSplash: `${game}/gachaSplash`,
        gachaCard: `${game}/gachaCard`,
        bannerCard: `${game}/bannerCard`,
      },
    });
  }

  while (phase.characters.fourStars.length < 3) {
    phase.characters.fourStars.push({
      name: "????",
      rarity: 4,
      element: game,
      images: {
        gachaSplash: `${game}/gachaSplash`,
        gachaCard: `${game}/gachaCard`,
        bannerCard: `${game}/bannerCard`,
      },
    });
  }

  let w = data.weapons
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

  while (phase.weapons.fiveStars.length < simBanners) {
    phase.weapons.fiveStars.push({
      name: "????",
      rarity: 5,
      game: game,
      weaponType: "default",
      icon: `./images/weapons/default/fiveStars/${game}_default.png`,
    });
  }

  if (phase.weapons.fourStars.length < 5 && game == "genshin") {
    const weaponTypes = {
      genshin: ["bow", "sword", "catalyst", "polearm", "claymore"],
    };

    weaponTypes[game].forEach((weapon) => {
      const weaponTypeExists =
        phase.weapons.fourStars.find((w) => {
          w.weaponType == weapon;
        }) != undefined;
      if (!weaponTypeExists) {
        phase.weapons.fourStars.push({
          name: "????",
          rarity: 5,
          weaponType: weapon,
          icon: `./images/weapons/default/fourStars/${game}_${weapon}.png`,
          game: game,
        });
      }
    });
    phase.weapons.fourStars.sort((a, b) => {
      return (
        weaponTypes[game].indexOf(a.weaponType) -
        weaponTypes[game].indexOf(b.weaponType)
      );
    });
  } else {
    while (phase.weapons.fourStars.length < 3) {
      phase.weapons.fourStars.push({
        name: "????",
        rarity: 4,
        game: game,
        weaponType: "default",
        icon: `./images/weapons/default/fourStars/${game}_default.png`,
      });
    }
  }

  return phase;
}
