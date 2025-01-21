'use client'

import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";


export function GotToDashboardButton() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/dashboard`);
  };

  return (
    <InteractiveHoverButton onClick={handleNavigation}
    // size="lg"
    className=" bg-gradient-to-tl bg-fuchsia-300 text-black hover:bg-gray-800 px-8 rounded-full h-12 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
>
    Start Free Trial
    {/* <ArrowRight className="ml-2 w-4 h-4 hover:translate-x-1 transition-transform duration-300" /> */}
    </InteractiveHoverButton>
  );
}