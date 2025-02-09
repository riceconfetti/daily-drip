export type Game = {
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
  servers: Server[];
};

export type Attribute = {
  id: number;
  game: Game;
  name: string;
  primary: boolean;
};

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
    variant: "portrait" | "landscape" | "icon" | "banner";
    style: object;
  }[];
  events: GachaEvent[];
};

export type Server = {
  id: string;
  game: Game;
  name: string;
  timezone: string;
};

export type GachaEvent = {
  id: string;
  game: Game;
  version: Version;
  phase: Phase;
  full_version: boolean;
  startDate: string;
  endDate: string;
  featured_characters: Character[];
  featured_weapons: Weapon[];
};

export type Weapon = {
  id: string;
  name: string;
  rarity: 5 | 4;
  game: Game;
  type: Attribute;
};

export type Version = {
  id: string;
  game: Game[];
  semVer: number;
  name: string;
  events: GachaEvent[];
};

export type Phase = {
  id: number;
  game: Game;
  phase: string;
  start: string;
  end: string;
};

export type EventCharacter = {
  id: number;
  characters_id: string;
  events_id: string;
};

export type EventWeapon = {
  id: number;
  weapons_id: string;
  events_id: string;
};
