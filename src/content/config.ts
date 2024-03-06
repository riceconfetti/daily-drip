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
        name: z.string(),
        chronicle: z.object({
            characters: z.array(z.string()),
            weapons: z.array(z.string())
        })
    }).partial()
})

const issuesCollection = defineCollection({
    type:"content",
    schema: z.object({
        title: z.string(),
        image: z.string(),
        publishedDate: z.string(),
        tags: z.array(z.string())
    })
})

export const collections = {
  'banners': bannerCollection,
  'versions': versionsCollection,
  'issues': issuesCollection
};