import { Character } from "./character";
import type { Weapon } from "./weapon";

export interface Phase {
  number: number;
  date: string;
  characters?: {
    fiveStars: Character[];
    fourStars: Character[];
  };
  weapons?: {
    fiveStars: Weapon[];
    fourStars: Weapon[];
  };
}
export class Version {
  version: number;
  startDate: string;
  endDate: string;
  name?: string;
  phases?: Phase[];
  constructor(data) {
    this.version = data.version;
    this.startDate = data.startDate;
    this.endDate = data.startDate;
    if (data.name != undefined) {
      this.name = data.name;
    }
  }
}
