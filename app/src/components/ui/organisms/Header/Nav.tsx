import React from "react";

import styled from "@emotion/styled";

import UserMenu from "@components/ui/molecules/Menu/User";
import PageMenu from "@components/ui/molecules/Menu/Page";
import DarkModeButton from "@components/ui/molecules/DarkModeButton";

const Nav = () => {
  const username = null;

  const menuProps = {
    username,
  };

  return (
    <Container>
      <DarkModeButton />
      {username && <UserMenu {...menuProps} />}
      <PageMenu {...menuProps} />
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  column-gap: 1rem;
`;

export default Nav;
