
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { projects, feedbacks } from '@/db/schema'
import { auth } from "@clerk/nextjs/server";
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL

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

  export async function getFeedbacks(projectId: number) {

    return db.select().from(feedbacks).where(eq(feedbacks.project_id, projectId));
  }

