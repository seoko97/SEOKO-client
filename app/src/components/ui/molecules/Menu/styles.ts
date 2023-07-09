import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Container = styled.ul`
  width: 130px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0;

  background-color: ${({ theme }) => theme.background2};
  box-shadow: ${({ theme }) => theme.BOX_SHADOW.primary};

  list-style: none;

  ${getTransitionEffect(["box-shadow", "background-color"])}
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const showAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const hideAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-5%);
  }
`;
