import { defineCollection, z, reference } from "astro:content";
import directus from "$services/directus";
import { readItems } from "@directus/sdk";
// import { glob, file } from "astro/loaders";

const games = defineCollection({
  loader: async () =>
    await directus.request(
      readItems("games", {
        fields: ["id", "name", "elementMain", "imageFormats"],
      })
    ),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    elementMain: z.boolean(),
    imageFormats: z.object({
      name: z.string(),
      transforms: z.object({
        key: z.string(),
        params: z.array(z.string().or(z.number())),
      }),
    }),
  }),
});

const attributes = defineCollection({
  loader: async () =>
    await directus.request(
      readItems("attributes", {
        fields: ["id", "name", "game", "primary"],
      })
    ),
  schema: z.object({}),
});

const characters = defineCollection({
  loader: async () =>
    await directus.request(
      readItems("characters", {
        fields: [
          "id",
          "name",
          "game",
          "primary_attribute",
          "secondary_attribute",
          "focalPoint",
          "crop",
          "colors",
        ],
      })
    ),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    game: reference("games"),
    rarity: z.number(),
    bannerName: z.string(),
    primary_attribute: reference("attributes"),
    secondary_attribute: reference("attributes"),
    focalPoint: z.object({ x: z.number(), y: z.number() }),
    crop: z.object({ x: z.number(), y: z.number() }),
    colors: z.array(
      z.object({
        hex: z.string(),
        red: z.number(),
        green: z.number(),
        blue: z.number(),
        hue: z.number(),
        intensity: z.number(),
        lightness: z.number(),
        saturation: z.number(),
        area: z.number(),
      })
    ),
  }),
});

export const collections = { games, attributes, characters };
