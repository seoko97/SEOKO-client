"use client";

import React from "react";

import useDarkMode from "@hooks/useDarkMode";

import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";

const DarkModeButton = () => {
  const [mode, onChangeTheme] = useDarkMode();

  if (!mode) return null;

  const Icon = mode === "light" ? MoonIcon : SunIcon;

  const wrapperProps = {
    onClick: onChangeTheme,
    className:
      "b-0 z-50 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0",
  };

  const iconProps = {
    className: "h-6 w-6 fill-gray-500 transition-colors hover:fill-yellow-400",
  };

  return (
    <button {...wrapperProps}>
      <Icon {...iconProps} />
    </button>
  );
};

export default DarkModeButton;
