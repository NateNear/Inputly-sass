
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { projects } from '@/db/schema'
import { auth } from "@clerk/nextjs/server";
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);
export const totalProjects = await db.select().from(projects) 
export async function getUserProjects() {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return db.select().from(projects).where(eq(projects.user_id, userId));
  }

