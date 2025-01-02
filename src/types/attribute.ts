import type { Game } from "./game.ts";

export type Attribute = {
  id: number | string;
  game: Game;
  name: string;
  primary: boolean;
};
