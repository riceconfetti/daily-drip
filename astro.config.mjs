import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true
	},
	integrations: [tailwind(), svelte()]
})
