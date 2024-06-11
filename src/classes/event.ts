import type { Game } from "./game";
import type { Character } from "./character";
export class Event {
  status: string;
  type: string; //banner; webEvent?; limitedEvent?; gameMode?
  game: Game;
  startDate: string;
  endDate: string;
  title?: string;
  character?: Character;
  image?: string;
  colors?: {
    primary: string;
    secondary: string;
    textAccent: string;
  };
}
