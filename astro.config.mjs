import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import db from '@astrojs/db'; // ایمپورت دیتابیس

export default defineConfig({
  output: 'hybrid', // برای فعال‌سازی API بک‌اند
  integrations: [
    react(), 
    tailwind(), 
    db() // اجرای دیتابیس در پروژه
  ],
});