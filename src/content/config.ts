import { z, defineCollection, reference } from "astro:content";

const gameCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    maintenance: z.string().time(),
    update: z.string().time(),
    reset: z.string().time(),
  }),
});

const characterCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    rarity: z.number(),
    element: z.string(),
    weaponType: z.string().optional(),
    bannerName: z.string().optional(),
    splashArt: z.string().optional(),
  }),
});

const weaponsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    rarity: z.number(),
    weaponType: z.string(),
    splashImage: z.string(),
  }),
});

const eventCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    type: z.string(),
    game: reference("games"),
    startDate: z.string().date(),
  }),
});

// const bannerCollection = defineCollection({
//     type: "data",
//     schema: z.object({
//         time: z.string(),
//         characters: z.object({
//             five: z.array(z.string()),
//             four: z.array(z.string())
//         }),
//         weapons: z.array(z.string())
//     }).partial()
// });

// const versionsCollection = defineCollection({
//     type: "data",
//     schema: z.object({
//         version: z.number(),
//         name: z.string(),
//         chronicle: z.object({
//             characters: z.array(z.string()),
//             weapons: z.array(z.string())
//         })
//     }).partial()
// })

// const issuesCollection = defineCollection({
//     type:"content",
//     schema: z.object({
//         title: z.string(),
//         image: z.string(),
//         publishedDate: z.string(),
//         tags: z.array(z.string())
//     })
// })

export const collections = {
  games: gameCollection,
  characters: characterCollection,
  weapons: weaponsCollection,
  events: eventCollection,
};
