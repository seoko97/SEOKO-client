import React from "react";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
import { getProjects } from "@/apis/project";

interface IProps {
  children: React.ReactNode;
}

const Hydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  const projects = await queryClient.fetchQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <RqHydrate state={dehydratedState}>
      <div className="w-full px-0 py-4">
        <h1 className="mb-1 text-4xl font-bold text-primary transition-[color]">
          PROJECT
          <span className="ml-4 align-top text-sm font-normal">{projects.length} projects</span>
        </h1>
        <p className="text-slate-500 transition-[color] dark:text-slate-400">
          연도별로 진행한 프로젝트 목록입니다.
        </p>
      </div>
      {children}
    </RqHydrate>
  );
};

export default Hydrate;
