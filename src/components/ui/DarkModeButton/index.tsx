"use client";

import React from "react";

import useDarkMode from "@hooks/useDarkMode";

import { SunIcon, MoonIcon } from "@components/icons";

const DarkModeButton = () => {
  const [mode, onChangeTheme] = useDarkMode();

  if (!mode) return null;

  const Icon = mode === "light" ? MoonIcon : SunIcon;

  return (
    <button
      onClick={onChangeTheme}
      className="b-0 z-50 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
      aria-label="toggle dark mode"
    >
      <Icon className="h-6 w-6 fill-gray-500 transition-[fill] hover:fill-yellow-400" />
    </button>
  );
};

export default DarkModeButton;
