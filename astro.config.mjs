// @ts-check
import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  env: {
    schema: {
      IMGPROXY_KEY: envField.string({ context: "server", access: "public" }),
      IMGPROXY_SALT: envField.string({ context: "server", access: "public" }),
      DIRECTUS_TOKEN: envField.string({ context: "client", access: "public" }),
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});