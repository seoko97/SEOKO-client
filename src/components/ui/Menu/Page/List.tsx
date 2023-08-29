import React from "react";

import MenuItem from "@components/ui/core/MenuItem";

interface IProps {
  isSign: boolean;
}

const PageMenu: React.FC<IProps> = ({ isSign }) => {
  return (
    <ul className="menu">
      <MenuItem href="/">HOME</MenuItem>
      <MenuItem href="/series">SERIES</MenuItem>
      <MenuItem href="/project">PROJECT</MenuItem>
      <MenuItem href="/about">ABOUT</MenuItem>
      {!isSign && <MenuItem href="/signin">로그인</MenuItem>}
    </ul>
  );
};

export default PageMenu;
