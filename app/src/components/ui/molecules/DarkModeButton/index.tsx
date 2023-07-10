import React from "react";

import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

import useDarkMode from "@hooks/useDarkMode";

import SunIcon from "@components/icons/SunIcon";
import MoonIcon from "@components/icons/MoonIcon";

const DarkModeButton = () => {
  const [mode, onChangeTheme] = useDarkMode();

  if (!mode) return null;

  const Icon = mode === "light" ? MoonIcon : SunIcon;

  return (
    <Container onClick={onChangeTheme}>
      <Icon />
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 50;
  cursor: pointer;

  border: 0;
  padding: 0;

  background-color: transparent;

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.grey500};

    ${getTransitionEffect("fill")}

    &:hover {
      fill: #ffd500;
    }
  }
`;

export default DarkModeButton;
