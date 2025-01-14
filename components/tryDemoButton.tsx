'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function TryDemoButton() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/demo`);
  };

  return (
    <Button 
      size="lg"
      variant="outline"
      className="border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-8 rounded-full h-12 transition-all duration-300 hover:scale-105"
      onClick={handleNavigation}> 
      Watch the Demo
</Button>
  );
}