export class Character {
  name?: string;
  spec?: boolean;
  rarity?: number;
  element?: string;
  weaponType?: string;
  bannerName?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    textAccent?: string;
  };
  images?: {
    gachaSplash?: string;
    gachaCard?: string;
    bannerCard?: string;
  };
}
