import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import db from '@astrojs/db';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static', // این کلمه را جایگزین hybrid کردیم
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), tailwind(), db()],
});