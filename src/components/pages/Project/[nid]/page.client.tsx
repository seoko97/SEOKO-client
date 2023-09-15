"use client";

import React from "react";

import { useGetProjectQuery } from "@hooks/query/project";
import ProjectHeader from "@components/ui/ProjectHeader";
import { Viewer } from "@components/ui/Markdown";

interface IProps {
  nid: number;
}

const ProjectClient = ({ nid }: IProps) => {
  const { data: project } = useGetProjectQuery(nid);

  if (!project) return null;

  return (
    <>
      <ProjectHeader project={project} />
      <div className="relative my-6 flex w-full justify-center">
        <Viewer className="w-full max-w-[theme(screens.lg.max)]" content={project.content} />
      </div>
    </>
  );
};

export default ProjectClient;
