import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

import { getTransitionEffect } from "@/utils/css/getTransitionEffect";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  position: relative;

  width: 100%;
  min-height: 100vh;

  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.background1};

  ${getTransitionEffect("background-color")}
`;

export default AppLayout;
