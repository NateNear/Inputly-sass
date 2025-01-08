'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function GotToDashboardButton() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/dashboard`);
  };

  return (
    <Button onClick={handleNavigation}
    size="lg"
    className="bg-gray-900 text-white hover:bg-gray-800 px-8 rounded-full h-12 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
>
    Start Free Trial
    <ArrowRight className="ml-2 w-4 h-4 hover:translate-x-1 transition-transform duration-300" />
    </Button>
  );
}