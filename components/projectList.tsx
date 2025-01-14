import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserProjects, getUserSubscriptionAndProjects } from "@/index";
import { GotToProjectButton } from "./gotToProjectButton";
import { PROJECT_LIMITS } from "@/utils/subscriptions";
import { DeleteProjectButton } from "./deleteProjectButton";


export async function ProjectList() {
  const projectsOfUser = await getUserProjects();
  const { subscription, projectCount } = await getUserSubscriptionAndProjects();
  const projectLimit = PROJECT_LIMITS[subscription.plan as keyof typeof PROJECT_LIMITS || 'free'];
  const canCreateMore = projectCount < projectLimit;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-gray-50">Your Projects</h2>
          <p className="text-sm text-gray-500">
            {projectCount} / {projectLimit === Infinity ? '∞' : projectLimit} projects used
          </p>
        </div>
        {!canCreateMore && (
          <div className="text-red-500 text-sm">
            You&apos;ve reached your project limit. 
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 py-6">
        {projectsOfUser.map((project) => (
          <Card
            className="h-[200px] w-[350px] mx-auto hover:scale-105 transition shadow-sm hover:shadow-lg"
            key={project.id}
          >
            <DeleteProjectButton projectId={project.id} />
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{project.description}</p>
            </CardContent>
            <CardFooter className="flex justify-start">
              <GotToProjectButton projectId={project.id.toString()} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
