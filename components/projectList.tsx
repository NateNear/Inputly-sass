import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GotToProjectButton } from "./gotToProjectButton";
import { DeleteProjectButton } from "./deleteProjectButton";
import { getUserProjects, getUserSubscriptionAndProjects } from "@/index";
import { PROJECT_LIMITS } from "@/utils/subscriptions";
import { Globe, Boxes, TrendingUp } from "lucide-react";

export async function ProjectList() {
  const projectsOfUser = await getUserProjects();
  const { subscription, projectCount } = await getUserSubscriptionAndProjects();
  const projectLimit = PROJECT_LIMITS[subscription.plan as keyof typeof PROJECT_LIMITS || 'free'];
  const canCreateMore = projectCount < projectLimit;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold bg-black bg-clip-text text-transparent">
              Your Projects
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <Boxes className="h-5 w-5 text-indigo-500" />
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {projectCount} / {projectLimit === Infinity ? '∞' : projectLimit} projects used
              </p>
            </div>
          </div>
          {!canCreateMore && (
            <div className="px-4 py-2 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-full">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Project limit reached
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsOfUser.map((project) => (
          <Card
            key={project.id}
            className="group relative overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <DeleteProjectButton projectId={project.id} />
            </div>
            
            
            <CardHeader className="relative">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                  <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {project.url}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="line-clamp-3 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
              <GotToProjectButton 
                projectId={project.id.toString()} 
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;