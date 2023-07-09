import React, { PropsWithChildren } from "react";
import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

interface IProps {
  className?: string;
}

const AppLayout: React.FC<PropsWithChildren<IProps>> = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

const Container = styled.main`
  position: relative;

  width: 100%;
  min-height: 100vh;

  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.background1};

  ${getTransitionEffect("background-color")}
`;

export default AppLayout;
