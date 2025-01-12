import type { Game } from "./game.ts";
import type { Attribute } from "./attribute.ts";

export type Character = {
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
  card_edits: {
    variant: 'portrait'| 'landscape' | 'icon' | 'banner',
    style: object
  }[];
};
