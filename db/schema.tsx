
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name'),
  url: varchar('url'),
  user_id: varchar('user_id'),
  description: varchar('description')
});
        