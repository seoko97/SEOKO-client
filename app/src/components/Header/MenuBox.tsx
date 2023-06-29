import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.font_color1};

  gap: 1rem;

  & > a,
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & svg {
    width: 24px;
    height: 24px;

    fill: ${({ theme }) => theme.font_color1};

    cursor: pointer;
  }
`;

const MenuBox = () => {
  return (
    <Container>
      <div>asd</div>
    </Container>
  );
};

export default MenuBox;
