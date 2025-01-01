import { createDirectus, rest, staticToken } from "@directus/sdk";
import dotenv from "dotenv";
dotenv.config();

const token: string = String(process.env.DIRECTUS_TOKEN);

type Game = {
  id: string;
  name: string;
  elementMain: boolean;
  imageFormats: {
    name: string;
    transforms: {
      key: string;
      params: (string | number)[];
    }[];
  }[];
};

type Character = {
  id: string;
  name: string;
  game: Game;
  rarity: 5 | 4;
  bannerName: string;
  primary_attribute: Attribute;
  secondary_attribute: Attribute;
  focalPoint: {
    x: number;
    y: number;
  };
  crop: {
    x: number;
    y: number;
  };
  colors: {
    hex: string;
    red: number;
    green: number;
    blue: number;
    hue: number;
    intensity: number;
    lightness: number;
    saturation: number;
    area: number;
  }[];
};

type Attribute = {
  id: number |string;
  game: Game;
  name: string;
  primary: boolean;
};

type Schema = {
  games: Game[];
  attributes: Attribute[];
  characters: Character[];
};
const directus = createDirectus<Schema>("https://cms.dailydrip.news")
  .with(staticToken(token))
  .with(rest());

export default directus;
