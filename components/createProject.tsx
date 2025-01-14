"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, CirclePlus } from 'lucide-react';
import { newProjectAction } from "@/actions/newProjectAction";
import { SubmitButton } from "./submitButton";
import { monthlyPlanId, yearlyPlanId } from '@/lib/payments';
import { SubscribeBtn } from "@/app/(user)/payments/subscribe-btn";


const PROJECT_LIMITS: { [key: string]: number } = {
  free: 3,
  monthly: 10,
  pro: Infinity
};

export function CreateProject({ 
  variant = "default", 
  icon = "plus", 
  className = "",
  subscription = { plan: 'free' },
  projectCount = 3
}) {
  const Icon = icon === "circle-plus" ? CirclePlus : Plus;
  const projectLimit = PROJECT_LIMITS[subscription?.plan || 'free'];
  const canCreateMore = projectCount < projectLimit;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "circle" ? (
          <Button 
            variant="outline" 
            className={`rounded-full p-2 hover:bg-gray-100 transition-colors ${className}`}
            aria-label="Add new project"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        ) : (
          <Button className={`flex flex-shrink ${className}`}>
            <Icon className="mr-2" />
            New Project
          </Button>
        )}
      </DialogTrigger>

      {canCreateMore ? (
        <DialogContent className="sm:max-w-[425px] w-full">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Create a New Project to get started.
            </DialogDescription>
          </DialogHeader>
          <form className="flex gap-4 flex-col" action={newProjectAction}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Project Name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" placeholder="https://example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" id="description" placeholder="Description (optional)" />
            </div>
            <SubmitButton />
          </form>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px] w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">Project Limit Reached</DialogTitle>
            <DialogDescription className="text-center mt-4">
              You&apos;ve reached the maximum limit of {projectLimit} {projectLimit === 1 ? 'project' : 'projects'} on your {subscription.plan} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 items-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Upgrade to our monthly or yearly plan to create unlimited projects and unlock premium features.
              </p>
            </div>
            <SubscribeBtn price={monthlyPlanId}/>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}