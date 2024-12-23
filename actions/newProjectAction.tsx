"use server"

import { db } from "@/index";
import { auth } from "@clerk/nextjs/server";
import { projects } from '@/db/schema'

export async function newProjectAction(formData: FormData) {
    const { userId } = await auth();
    console.log("user ID", userId)
    const newProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      user_id: userId,
    }

    await db.insert(projects).values(newProject)
}
