"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import lightModeLogo from '../public/logo-lightMode.png'
import darkModeLogo from '../public/logo-darkMode.png'

function HeaderLogo() {
  const { theme } = useTheme();

  return (
    <Image
      className="flex justify-start flex-shrink pl-1 w-16 lg:w-[110px] pb-[5px] md:pl-4 lg:pl-6"
      src={theme === "dark" ? darkModeLogo : lightModeLogo}
      width={110}
      height={110}
      alt="logo"
    />
  );
}

export default HeaderLogo;
