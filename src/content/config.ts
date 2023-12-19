import { z, defineCollection, reference } from 'astro:content';

const bannerCollection = defineCollection({
    type: "data",
    schema: z.object({
        time: z.string(),
        characters: z.object({
            five: z.array(z.string()),
            four: z.array(z.string())
        }),
        weapons: z.array(z.string())
    }).partial()
});

const versionsCollection = defineCollection({
    type: "data",
    schema: z.object({
        version: z.number(),
        name: z.string()
    }).partial()
})

const issuesCollection = defineCollection({
    type:"content",
    schema: z.object({
        title: z.string(),
        publishedDate: z.date()
    })
})

export const collections = {
  'banners': bannerCollection,
  'versions': versionsCollection
};