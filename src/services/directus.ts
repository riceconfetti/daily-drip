import { createDirectus, rest, staticToken } from "@directus/sdk";
import type { Game } from "$types/game";
import type { Attribute } from "$types/attribute";
import type { Character } from "$types/character";
import dotenv from "dotenv";
dotenv.config();

const token: string = String(process.env.DIRECTUS_TOKEN);

type Schema = {
  games: Game[];
  attributes: Attribute[];
  characters: Character[];
};
const directus = createDirectus<Schema>("https://cms.dailydrip.news")
  .with(staticToken(token))
  .with(rest());

export default directus;
