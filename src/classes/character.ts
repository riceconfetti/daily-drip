export class Character {
  name: string;
  rarity: number;
  element: string;
  path?: string;
  banner: string;
  splash?: string;

  constructor(name, data:{path?: string, rarity, element, banner, splash?:string}) {
    this.name = name;
    if(data.path) this.path = data.path;
    this.rarity = data.rarity;
    this.element = data.element;
    this.banner = data.banner;
    if(data.splash) this.splash = data.splash;
  }
}