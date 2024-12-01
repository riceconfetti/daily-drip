import { createDirectus, rest, staticToken} from '@directus/sdk';
import dotenv from 'dotenv'
dotenv.config()

const token: string = String(process.env.DIRECTUS_TOKEN)

type Game = {
  id: string,
  name: string, 
  elementMain: boolean, 
  imageFormats: {
    name: string, 
    transforms: {
        key: string, 
        params: (string | number)[]
    }[]
  }[]
}

type Character = {
    id: string, 
    name: string, 
    game: Game,
    rarity: 5 | 4,
    bannerName: string,
    primaryAttribute: Attribute,
    secondaryAttribute: Attribute
    focalPoint: string,
    colors: {
        primary: string,
        secondary: string, 
        accent: string
    }
}


type Attribute = {
    id: string,
    primary: boolean,
    game: Game,
    colors?: {
        colorPrimary: string,
        colorSecondary: string,
        colorAccent: string
    }
}

type Schema = {
    games:Game[],
    attributes: Attribute[]
    characters: Character[]
}
const directus = createDirectus<Schema>('https://cms.dailydrip.news').with(staticToken(token)).with(rest());

export default directus;