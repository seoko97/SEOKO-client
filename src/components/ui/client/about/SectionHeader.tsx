import React from "react";

import { useGetUserQuery } from "@hooks/query/user";

interface IProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const SectionHeader = ({ children, onClick }: IProps) => {
  const { data: username } = useGetUserQuery();

  return (
    <div className="mb-4 flex w-full gap-4 text-primary transition-[color]">
      <h1 className="text-4xl font-bold">{children}</h1>
      {username && onClick && (
        <span onClick={onClick} className="cursor-pointer font-normal">
          관리
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
