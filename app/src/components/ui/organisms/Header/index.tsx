import React, { useEffect, useState } from "react";
import { getTransitionEffect } from "@seoko/theme";
import styled from "@emotion/styled";

import Nav from "@components/ui/organisms/Header/Nav";
import Logo from "@components/ui/atoms/Logo";
import RowFrame from "@/components/ui/templates/RowFrame";

const Header: React.FC = () => {
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
        <Nav />
      </RowFrame>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: -2rem;

  z-index: 100;

  width: 100%;
  padding-top: 2rem;

  backdrop-filter: blur(3px);
  background-color: ${({ theme }) => theme.background3};

  ${RowFrame} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  &.fixed {
    box-shadow: rgb(0 0 0 / 8%) 0px 0px 8px;
  }

  ${getTransitionEffect(["box-shadow", "background-color"])}
`;

export default Header;
