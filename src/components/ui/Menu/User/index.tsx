import React from "react";

import { useSignOutMutation } from "@hooks/query/user";
import UserMenu from "@components/ui/Menu/User/List";
import BaseMenu from "@components/ui/Menu";
import Avatar from "@components/ui/core/Avatar";

interface IProps {
  username?: string | null;
}

const Menu: React.FC<IProps> = ({ username }) => {
  const { mutate } = useSignOutMutation();

  const baseMenuProps = {
    button: (
      <button
        aria-label="toggle user menu"
        className="flex cursor-pointer items-center justify-center gap-x-2 text-primary transition-[color] hover:text-effect1 [&.is-active]:text-effect1"
      >
        <Avatar />
        <span className="sm:hidden">{username}</span>
      </button>
    ),
    menu: <UserMenu username={username} signOut={mutate} />,
  };

  return <BaseMenu {...baseMenuProps} />;
};

export default Menu;
