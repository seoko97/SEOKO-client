import React, { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { useGetUserQuery } from "@hooks/query/user";
import UserMenu from "@components/ui/Menu/User";
import PageMenu from "@components/ui/Menu/Page";
import DarkModeButton from "@components/ui/DarkModeButton";

const Nav = () => {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  const { data, refetch } = useGetUserQuery();
  const username = data?.username;

  useEffect(() => {
    if (pathnameRef.current === pathname) return;

    pathnameRef.current = pathname;
    refetch();
  }, [pathname, refetch]);

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
