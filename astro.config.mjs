import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import db from '@astrojs/db';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';

// Use Node adapter for local dev, Netlify adapter for production
const adapter = process.env.NETLIFY ? netlify() : node();

export default defineConfig({
  output: 'static',
  adapter,
  integrations: [react(), tailwind(), db()],
});