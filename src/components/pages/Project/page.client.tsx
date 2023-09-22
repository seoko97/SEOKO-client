"use client";

import React from "react";

import { getProjectsByDate } from "@utils/getProjectsByDate";
import { useGetProjectsQuery } from "@hooks/query/project";
import ProjectList from "@components/ui/ProjectList";

const ProjectClient = () => {
  const { data: projects } = useGetProjectsQuery();
  const filteredProjects = getProjectsByDate(projects);
  const yearsBtProject = Object.keys(filteredProjects).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div>
      {yearsBtProject.map((year) => (
        <div key={year} className="flex w-full flex-col gap-4 [&:not(:last-child)]:mb-8">
          <h2 className="last text-2xl font-bold">
            <span className="text-primary transition-[color]">{year}</span>
            <span className="ml-4 align-top text-sm font-normal text-slate-500 transition-[color] dark:text-slate-400">
              {filteredProjects[year].length} projects
            </span>
          </h2>
          <ProjectList projects={filteredProjects[year]} />
        </div>
      ))}
    </div>
  );
};

export default ProjectClient;
