// @ts-check
// @ts-check
import { defineConfig, envField} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import dotenv from 'dotenv'
dotenv.config()

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()], 
  env: {
    schema: {
      IMGPROXY_KEY: envField.string({ context: "server", access: "secret" }),
      IMGPROXY_SALT: envField.string({ context: "server", access: "secret" }),
    }
  }
});