import { defineConfig } from "astro/config";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    enhancedImages(),
    tailwind(),
    svelte(),
    ViteImageOptimizer({}),
    swup({ theme: ["overlay", { direction: "to-bottom" }] }),
  ],
});
