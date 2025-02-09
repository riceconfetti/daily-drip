import { createDirectus, rest, staticToken } from "@directus/sdk";
import { DIRECTUS_TOKEN } from "astro:env/client";
import type {
  Game,
  Attribute,
  Character,
  Weapon,
  Server,
  Phase,
  GachaEvent,
  Version,
  EventCharacter,
  EventWeapon,
} from "$types/db";

type Schema = {
  games: Game[];
  attributes: Attribute[];
  characters: Character[];
  servers: Server[];
  weapons: Weapon[];
  phases: Phase[];
  events: GachaEvent[];
  versions: Version[];
  events_characters: EventCharacter[];
  events_weapons: EventWeapon[];
};
const directus = createDirectus<Schema>("https://cms.dailydrip.news")
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

export default directus;
