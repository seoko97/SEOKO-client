import React from "react";

import { Container } from "@components/ui/molecules/Menu/styles";
import MenuItem from "@/components/ui/atoms/MenuItem";

interface IProps {
  isSign: boolean;
}

const PageMenu: React.FC<IProps> = ({ isSign }) => {
  return (
    <Container>
      <MenuItem href="/">HOME</MenuItem>
      <MenuItem href="/project">PROJECT</MenuItem>
      <MenuItem href="/about">ABOUT</MenuItem>
      {!isSign && <MenuItem href="/signin">로그인</MenuItem>}
    </Container>
  );
};

export default PageMenu;
