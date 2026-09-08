"use client";

import React from "react";

import { useGetProjectsQuery } from "@hooks/query/project";
import ProjectList from "@components/ui/ProjectList";
import SectionHeader from "@components/ui/client/about/SectionHeader";

const Project = () => {
  const { data: projects } = useGetProjectsQuery();

  if (!projects) return null;

  const sortedProjects = [...projects].sort((a, b) =>
    new Date(a.start) > new Date(b.start) ? -1 : 1,
  );

  return (
    <section className="flex w-full flex-col">
      <SectionHeader>Project</SectionHeader>
      <ProjectList projects={sortedProjects} />
    </section>
  );
};

export default Project;
