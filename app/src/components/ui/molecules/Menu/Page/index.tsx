import React from "react";

import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

import PageMenu from "@components/ui/molecules/Menu/Page/List";
import BaseMenu from "@components/ui/molecules/Menu";
import MenuIcon from "@components/icons/MenuIcon";

interface IProps {
  username: string | null;
}

const Menu: React.FC<IProps> = ({ username }) => {
  const pageMenuProps = {
    isSign: Boolean(username),
  };

  const baseMenuProps = {
    button: (
      <MenuButton>
        <MenuIcon />
      </MenuButton>
    ),
    menu: <PageMenu {...pageMenuProps} />,
  };

  return <BaseMenu {...baseMenuProps} />;
};

const MenuButton = styled.button`
  display: flex;

  background-color: transparent;
  border: none;
  padding: 0;

  cursor: pointer;

  & > svg {
    fill: ${({ theme }) => theme.font_color1};
    ${getTransitionEffect("fill")}
  }

  &:hover,
  &.is-active {
    & > svg {
      fill: ${({ theme }) => theme.effect1};
    }
  }
`;

export default Menu;
