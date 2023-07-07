import React from "react";
import Link from "next/link";
import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

interface IProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
}

type TComponent = React.FC<React.PropsWithChildren<IProps>>;

const MenuItem: TComponent = ({ children, href, ...rest }) => {
  return <Li {...rest}>{href ? <Link href={href}>{children}</Link> : children}</Li>;
};

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 0.9em;
  padding: 0.7rem 0.5rem;
  color: ${({ theme }) => theme.font_color1};

  &:hover {
    background-color: ${({ theme }) => theme.background1};
    color: ${({ theme }) => theme.effect1};
  }

  cursor: pointer;

  ${getTransitionEffect(["background-color", "color"])}
`;

export default MenuItem;
