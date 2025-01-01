import { defineCollection, z, reference } from "astro:content";
import directus from "$services/directus";
import { readItems } from "@directus/sdk";
// import { glob, file } from "astro/loaders";

const games = defineCollection({
  loader: async () =>
    await directus.request(
      readItems("games", {
        fields: ["id", "name", "elementMain", "imageFormats"],
      }),
    ),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    elementMain: z.boolean(),
    imageFormats: z
      .array(
        z.object({
          name: z.string(),
          transforms: z.array(
            z.object({
              key: z.string(),
              params: z.array(z.string().or(z.number())),
            }),
          ),
        }),
      )
      .nullable(),
  }),
});

const attributes = defineCollection({
  loader: async () =>
    (
      await directus.request(
        readItems("attributes", {
          fields: ["id", "name", "game", "primary"],
        }),
      )
    ).map((att) => ({
      id: String(att.id),
      name: att.name,
      game: att.game,
      primary: att.primary,
    })),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    game: reference("games"),
    primary: z.boolean(),
  }),
});

const characters = defineCollection({
  loader: async () =>
    (
      await directus.request(
        readItems("characters", {
          limit: 300,
          fields: [
            "id",
            "name",
            "game",
            "rarity",
            "primary_attribute",
            "secondary_attribute",
            "focalPoint",
            "crop",
            "colors",
          ],
        }),
      )
    ).map((c) => {
      let charMod = {
        id: c.id,
        name: c.name,
        game: c.game,
        rarity: c.rarity,
        primary_attribute:
          c.primary_attribute != null ? String(c.primary_attribute) : null,
        secondary_attribute:
          c.secondary_attribute != null ? String(c.secondary_attribute) : null,
        focalPoint: c.focalPoint,
        crop: c.crop,
        colors: c.colors,
      };
      // console.log(charMod);
      return charMod;
    }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    game: reference("games"),
    rarity: z.number(),
    bannerName: z.string().nullable().optional(),
    primary_attribute: reference("attributes"),
    secondary_attribute: reference("attributes"),
    focalPoint: z.object({ x: z.number(), y: z.number() }),
    crop: z.object({ x: z.number(), y: z.number() }),
    colors: z
      .array(
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
        }),
      )
      .nullable(),
  }),
});

export const collections = { games, attributes, characters };
