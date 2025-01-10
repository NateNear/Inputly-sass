'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function TryDemoButton() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/dashboard`);
  };

  return (
    <Button onClick={handleNavigation}
     className="bg-indigo-600 hover:bg-indigo-700 text-white">
    Try Demo
    <ChevronRight className="ml-2 h-4 w-4" />
</Button>
  );
}