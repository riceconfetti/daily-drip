export class Character {
  name: string;
  rarity: number;
  element: string;
  banner: string;
  splash: string;

  constructor(name, data) {
    this.name = name;
    this.rarity = data.rarity;
    this.element = data.element;
    this.banner = data.banner;
    this.splash = data.splash;
  }
}