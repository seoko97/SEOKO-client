import React from "react";

import UserMenu from "@components/ui/Menu/User";
import PageMenu from "@components/ui/Menu/Page";
import DarkModeButton from "@components/ui/DarkModeButton";

const Nav = () => {
  const username = "asd";

  const menuProps = {
    username,
  };

  return (
    <div className="flex items-center justify-center gap-x-4">
      <DarkModeButton />
      {username && <UserMenu {...menuProps} />}
      <PageMenu {...menuProps} />
    </div>
  );
};

export default Nav;
