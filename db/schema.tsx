
import { pgTable, serial, text, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name'),
  url: varchar('url'),
  user_id: varchar('user_id'),
  description: varchar('description')
});
        
export const feedbacks = pgTable('feedbacks', {
  project_id: integer('project_id').notNull().references(() => projects.id),
  feedback: varchar('feedback'),
  stars: integer('stars'),
  email: text('email')
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscribed: boolean("subscribed"),
});