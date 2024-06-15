import { defineConfig } from "astro/config";
import { enhancedImages } from "@sveltejs/enhanced-img";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    enhancedImages(),
    tailwind(),
    svelte(),
    swup({ theme: ["overlay", { direction: "to-bottom" }] }),
  ],
});
