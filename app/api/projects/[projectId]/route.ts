import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { projects, feedbacks } from '@/db/schema';
import { db } from '@/index';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const projectId = parseInt(params.projectId);

    
    const project = await db.select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .where(eq(projects.user_id, userId))
      .limit(1);

    if (!project.length) {
      return new NextResponse("Not found", { status: 404 });
    }

    await db.delete(feedbacks)
      .where(eq(feedbacks.project_id, projectId));

    await db.delete(projects)
      .where(eq(projects.id, projectId));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[PROJECT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
