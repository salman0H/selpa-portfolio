import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), db()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['gsap'],
    }
  },
});