import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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

export function CreateProject({ variant = "default", icon = "plus", className = "" }) {
  const Icon = icon === "circle-plus" ? CirclePlus : Plus;
  
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
          <DialogClose>
          <Button type="submit" className="w-full sm:w-auto">
            Save changes
          </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}