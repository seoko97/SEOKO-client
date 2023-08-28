import React, { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import UserMenu from "@components/ui/Menu/User";
import PageMenu from "@components/ui/Menu/Page";
import DarkModeButton from "@components/ui/DarkModeButton";
import { getUser } from "@/apis/user";

const Nav = () => {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  const { data: username, refetch } = useQuery({ queryKey: ["user"], queryFn: getUser });

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
