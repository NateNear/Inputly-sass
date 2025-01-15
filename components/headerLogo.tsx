"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import lightModeLogo from '../public/logo-lightMode.png'
import darkModeLogo from '../public/logo-darkMode.png'
import { useRouter } from "next/navigation";

function HeaderLogo() {
  const { theme } = useTheme();

  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/`);
  };

  return (
    <Image
      className="flex justify-start flex-shrink pl-1 w-16 lg:w-[110px] pb-[5px] md:pl-4 lg:pl-6 hover:cursor-pointer"
      src={theme === "dark" ? darkModeLogo : lightModeLogo}
      width={110}
      height={110}
      alt="logo"
      onClick={handleNavigation}
    />
  );
}

export default HeaderLogo;
