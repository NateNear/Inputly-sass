import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserProjects } from "@/index";

export async function ProjectList() {
  const projectsOfUser = await getUserProjects();
  console.log("total Projects", projectsOfUser);

  return (
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
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
