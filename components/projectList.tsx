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
import { PROJECT_LIMITS, SUBSCRIPTION_PLANS } from "@/utils/subscriptions";
import { Button } from "@/components/ui/button";


export async function ProjectList() {
  const projectsOfUser = await getUserProjects();
  const { subscription, projectCount } = await getUserSubscriptionAndProjects();
  const projectLimit = PROJECT_LIMITS[subscription.plan || 'free'];
  const canCreateMore = projectCount < projectLimit;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <div>
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <p className="text-sm text-gray-500">
            {projectCount} / {projectLimit === Infinity ? '∞' : projectLimit} projects used
          </p>
        </div>
        {!canCreateMore && (
          <div className="text-red-500 text-sm">
            You&apos;ve reached your project limit. 
            {subscription.plan === 'free' && (
              <Button variant="link" className="text-indigo-600" onClick={() => window.location.href = '/pricing'}>
                Upgrade your plan
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 py-6">
        {projectsOfUser.map((project) => (
          <Card
            className="h-[200px] w-[350px] mx-auto hover:scale-105 transition shadow-sm hover:shadow-lg"
            key={project.id}
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{project.description}</p>
            </CardContent>
            <CardFooter className="flex justify-start">
              <GotToProjectButton projectId={project.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
