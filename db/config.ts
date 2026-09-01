import { defineDb, defineTable, column, NOW } from 'astro:db';

const Whisper = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    author: column.text(),
    message: column.text(),
    createdAt: column.date({ default: NOW }),
  }
});

export default defineDb({
  tables: { Whisper },
});