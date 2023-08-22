"use client";

import React, { useEffect, useState } from "react";

import Nav from "@components/ui/Header/Nav";
import Logo from "@components/ui/core/Logo";

const Header: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = window.scrollY || document.documentElement.scrollTop;

      if (scrollHeight >= 32) setIsFixed(true);
      else setIsFixed(false);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const containerProps = {
    className: `${
      isFixed ? "shadow-sm" : ""
    } sticky -top-8 z-50 w-full bg-tertiary pt-8 backdrop-blur-sm transition-[background-color,box-shadow]`,
  };

  const innerProps = {
    className: "frame flex h-[72px] items-center justify-between",
  };

  return (
    <div {...containerProps}>
      <div {...innerProps}>
        <Logo />
        <Nav />
      </div>
    </div>
  );
};

export default Header;
