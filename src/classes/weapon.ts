export class Weapon {
    name: string;
    rarity: number;
    element?: string;
    type?: string;
    path?: string;
    splash: string;
  
    constructor(name, data) {
      this.name = name;
      this.path = data.path;
      this.type = data.type;
      this.element = data.element;
      this.rarity = data.rarity;
      this.splash = data.splash;
    }
  }