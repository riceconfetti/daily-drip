import { z, defineCollection, reference } from 'astro:content'

const gameCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		icon: z.string(),
		times: z.object({
			version: z.string(),
			update: z.string(),
			maintenance: z.string(),
			zones: z.object({
				dev: z.string(),
				as: z.string(),
				eu: z.string(),
				na: z.string()
			})
		})
	})
})

const characterCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		rarity: z.number(),
		element: z.string(),
		weaponType: z.string().optional(),
		bannerName: z.string().optional(),
		colors: z
			.object({
				primary: z.string(),
				secondary: z.string(),
				textAccent: z.string()
			})
			.optional(),
		images: z
			.object({
				gachaSplash: z.string().optional(),
				gachaCard: z.string().optional(),
				bannerCard: z.string().optional()
			})
			.optional()
	})
})

const weaponsCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		rarity: z.number(),
		weaponType: z.string(),
		icon: z.string()
	})
})

const eventCollection = defineCollection({
	type: 'data',
	schema: z.object({
		status: z.string(),
		type: z.string(), //banner, webEvent?, limitedEvent?, gameMode?
		game: reference('games'),
		startDate: z.string().date(),
		startTime: z.string().optional(),
		endDate: z.string().date(),
		endTime: z.string().optional(),
		title: z.string().optional(),
		character: reference('characters').optional(),
		weapon: reference('weapons').optional(),
		priority: z.boolean().optional(),
		image: z.string().optional(),
		colors: z
			.object({
				primary: z.string(),
				secondary: z.string(),
				textAccent: z.string()
			})
			.optional()
	})
})

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

const versionsCollection = defineCollection({
	type: 'data',
	schema: z
		.object({
			version: z.number(),
			name: z.string(),
			startDate: z.string().date(),
			midDate: z.string().date(),
			endDate: z.string().date(),
			weapons: z.array(
				z.object({
					fiveStars: z.array(reference('weapons')),
					fourStars: z.array(reference('weapons'))
				})
			)
		})
		.partial()
})

export const collections = {
	games: gameCollection,
	characters: characterCollection,
	weapons: weaponsCollection,
	events: eventCollection,
	versions: versionsCollection
}
