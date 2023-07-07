import React from "react";

import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

import UserMenu from "@components/ui/molecules/Menu/User/List";
import BaseMenu from "@components/ui/molecules/Menu";
import Avatar from "@components/ui/atoms/Avatar";

interface IProps {
  username: string | null;
}

const Menu: React.FC<IProps> = ({ username }) => {
  const userMenuProps = {
    username,
    signOut: () => console.log("signOut"),
  };

  const baseMenuProps = {
    button: (
      <AvatarWrapper>
        <Avatar />
        <span>지석호</span>
      </AvatarWrapper>
    ),
    menu: <UserMenu {...userMenuProps} />,
  };

  return <BaseMenu {...baseMenuProps} />;
};

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  color: ${({ theme }) => theme.font_color1};

  cursor: pointer;

  &:hover,
  &.is-active {
    color: ${({ theme }) => theme.effect1};
  }

  ${getTransitionEffect("color")}

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > span {
      display: none;
    }
  }
`;

export default Menu;
