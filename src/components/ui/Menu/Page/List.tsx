import type { FC } from "react";

import MenuItem from "@components/ui/Menu/Item";

interface IProps {
  isSign: boolean;
}

const PageMenu: FC<IProps> = ({ isSign }) => {
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
