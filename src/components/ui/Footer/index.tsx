import React from "react";

import Logo from "@components/ui/core/Logo";
import { GithubIcon } from "@components/icons";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 h-36 w-full border-t border-solid border-gray-300">
      <div className="frame flex h-full flex-col items-center justify-center gap-5 text-primary">
        <div className="flex items-center justify-center gap-5">
          <Logo />
          <a href="https://github.com/seoko97" target="_blank" rel="noreferrer" title="github">
            <GithubIcon className="h-7 w-7 fill-[theme(textColor.primary)] transition-[fill] hover:fill-[theme(textColor.effect1)]" />
          </a>
        </div>
        <p className="text-sm text-gray-500">Copyright © SEOKO 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
