"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export function SubmitButton({ className = "w-full sm:w-auto" }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? <>
        <Loader className="mr-2 h-4 w-4 animate-spin"/>Creating...
        </>
      : "Create Project"}
    </Button>
  );
}
