import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  integrations: [tailwind(), svelte(), react()],
});
