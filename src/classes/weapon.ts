export class Weapon {
  name: string;
  spec?: boolean;
  rarity: number;
  game: string;
  weaponType: string;
  icon: string;
  priority?: boolean;

  constructor(data, game, priority?) {
    this.name = data.name;
    this.spec = data.spec;
    this.rarity = data.rarity;
    this.game = game;
    this.weaponType = data.weaponType;
    this.icon = data.icon;
    if (priority) {
      this.priority = priority;
    }
  }
}
