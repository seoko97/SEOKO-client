import React from "react";

import PageMenu from "@components/ui/Menu/Page/List";
import BaseMenu from "@components/ui/Menu";
import { MenuIcon } from "@components/icons";

interface IProps {
  username?: string | null;
}

const Menu: React.FC<IProps> = ({ username }) => {
  const baseMenuProps = {
    button: (
      <button
        aria-label="toggle menu"
        className="group flex cursor-pointer border-none bg-transparent p-0"
      >
        <MenuIcon className="fill-[theme(textColor.primary)] transition-[fill] group-hover:fill-[theme(textColor.effect1)] group-[.is-active]:fill-[theme(textColor.effect1)]" />
      </button>
    ),
    menu: <PageMenu isSign={Boolean(username)} />,
  };

  return <BaseMenu {...baseMenuProps} />;
};

export default Menu;
