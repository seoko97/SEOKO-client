"use client";

import { compiler } from "markdown-to-jsx";

import { createHeadingSlug } from "@utils/getToc";
import { useGetProjectQuery } from "@hooks/query/project";
import ProjectHeader from "@components/ui/ProjectHeader";
import overrides from "@components/ui/Markdown/overrides";

interface IProps {
  nid: number;
}

const ProjectClient = ({ nid }: IProps) => {
  const { data: project } = useGetProjectQuery(nid);

  if (!project) return null;

  const markdown = compiler(project.content, {
    wrapper: null,
    overrides,
    slugify: createHeadingSlug(),
  });

  return (
    <>
      <ProjectHeader project={project} />
      <div className="relative my-6 flex w-full justify-center">
        <div className="markdown w-full max-w-[theme(screens.lg.max)] md:w-full">{markdown}</div>
      </div>
    </>
  );
};

export default ProjectClient;
