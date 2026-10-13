import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jjloubser.github.io/topicmapgym/',
  integrations: [
    preact({ compat: true }),
    tailwind(),
  ],
  output: 'static',
  build: {
    assets: '_assets',
  },
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
