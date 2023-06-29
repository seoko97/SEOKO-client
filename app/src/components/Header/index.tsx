import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import RowFrame from "@/styles/RowFrame";

import Logo from "./Logo";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = window.scrollY || document.documentElement.scrollTop;

      if (scrollHeight >= 32) setIsFixed(true);
      else setIsFixed(false);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const containerProps = {
    className: isFixed ? "fixed" : "",
  };

  return (
    <Container {...containerProps}>
      <RowFrame>
        <Logo />
      </RowFrame>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  position: sticky;
  top: -32px;
  padding-top: 32px;
  z-index: 100;
  transition: box-shadow 0.15s, backdrop-filter 0.3s, background-color 0.3s;

  ${RowFrame} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  backdrop-filter: blur(3px);
  background-color: ${({ theme }) => theme.background3};
`;

export default Header;
