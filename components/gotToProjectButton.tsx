'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GotToProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/projects/${projectId}/`);
  };

  return (
    <Button onClick={handleNavigation}>Go to Project</Button>
  );
}