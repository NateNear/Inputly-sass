"use server"

import { db } from "@/index";
import { auth } from "@clerk/nextjs/server";
import { projects } from '@/db/schema'
import { redirect } from "next/navigation";

export async function newProjectAction(formData: FormData) {
    const { userId } = await auth();
    console.log("user ID", userId)
    const newProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      user_id: userId,
    }

    const [projectId] = await db.insert(projects).values(newProject).returning({id: projects.id})
    console.log("projectId", projectId.id)
    redirect(`/instructions/${projectId.id}/`)
}
