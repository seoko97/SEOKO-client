"use client";

import React from "react";

import { useGetUserQuery } from "@hooks/query/user";
import UserMenu from "@components/ui/Menu/User";
import PageMenu from "@components/ui/Menu/Page";
import DarkModeButton from "@components/ui/DarkModeButton";

const Nav = () => {
  const { data: username } = useGetUserQuery();

  const menuProps = { username };

  return (
    <div className="flex items-center justify-center gap-x-4">
      <DarkModeButton />
      {username && <UserMenu {...menuProps} />}
      <PageMenu {...menuProps} />
    </div>
  );
};

export default Nav;
