import React from "react";

import styled from "@emotion/styled";

import { getTransitionEffect } from "@/utils/css/getTransitionEffect";

import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";

interface Props {
  mode?: string;
  onClick: () => void;
}

const DarkModeButton = ({ mode, onClick }: Props) => {
  if (!mode) return null;

  const Icon = mode === "light" ? SunIcon : MoonIcon;

  return (
    <Container onClick={onClick}>
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  right: 30px;
  bottom: 30px;

  width: 40px;
  height: 40px;

  z-index: 50;
  cursor: pointer;

  background-color: var(--background4);
  box-shadow: var(--box_shadow1);
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.3s;

  & > svg {
    width: 24px;
    height: 24px;
    fill: #ccc;
    transition: fill 0.3s;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: var(--box_shadow2);
    & > svg {
      fill: #ffd500;
    }
  }

  ${getTransitionEffect(["background-color", "transform"], 300)}
`;

export default DarkModeButton;
