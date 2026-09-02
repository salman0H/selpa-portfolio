import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static', // Replaced hybrid output
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), db()],
  vite: {
    plugins: [tailwindcss()],
  },
});