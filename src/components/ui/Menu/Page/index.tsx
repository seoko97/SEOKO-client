import React from "react";

import PageMenu from "@components/ui/Menu/Page/List";
import BaseMenu from "@components/ui/Menu";
import { MenuIcon } from "@components/icons";

interface IProps {
  username: string | null;
}

const Menu: React.FC<IProps> = ({ username }) => {
  const pageMenuProps = {
    isSign: Boolean(username),
  };

  const baseMenuProps = {
    button: (
      <button className="group flex cursor-pointer border-none bg-transparent p-0">
        <MenuIcon className="fill-[theme(textColor.primary)] transition-[fill] group-hover:fill-[theme(textColor.effect1)] group-[.is-active]:fill-[theme(textColor.effect1)]" />
      </button>
    ),
    menu: <PageMenu {...pageMenuProps} />,
  };

  return <BaseMenu {...baseMenuProps} />;
};

export default Menu;
