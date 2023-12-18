import { z, defineCollection } from 'astro:content';

const genshinCollection = defineCollection({
    type: "data",
    schema: z.object({
        version: z.number(),
        time: z.date(),
        characters: z.object({
            five: z.array(z.string()),
            four: z.array(z.string())
        }),
        weapon: z.array(z.string())
    })
});

const starrailCollection = defineCollection({
    type: "data",
    schema: z.object({
        version: z.number(),
        time: z.date(),
        characters: z.object({
            five: z.array(z.string()),
            four: z.array(z.string())
        }),
        weapon: z.array(z.string())
    })
});

export const collections = {
  'genshin': genshinCollection,
  'starrail': starrailCollection
};