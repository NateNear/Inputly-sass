
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { projects, feedbacks, subscriptions } from '@/db/schema'
import { auth } from "@clerk/nextjs/server";
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL || ''
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema: { projects, feedbacks, subscriptions } });
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

  export async function getUserSubscriptionAndProjects() {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }
  
    const userSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);
  
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.user_id, userId));
  
    return {
      subscription: userSubscription[0] || { planType: 'free' },
      projectCount: userProjects.length
    };
  }

  export async function deleteProject(projectId: number) {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }
  
    await db.delete(feedbacks).where(eq(feedbacks.project_id, projectId));
      
    await db.delete(projects).where(eq(projects.id, projectId));
    
    revalidatePath('/projects');
  }
  
