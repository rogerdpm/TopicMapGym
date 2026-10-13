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
    inlineStylesheets: 'auto',
  },
  image: {
    remotePatterns: [{ protocol: 'https' }],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
