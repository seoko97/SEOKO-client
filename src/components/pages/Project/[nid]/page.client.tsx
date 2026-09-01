"use client";

import { compileMarkdown } from "@utils/markdown";
import { useGetProjectQuery } from "@hooks/query/project";
import ProjectHeader from "@components/ui/ProjectHeader";

interface IProps {
  nid: number;
}

const ProjectClient = ({ nid }: IProps) => {
  const { data: project } = useGetProjectQuery(nid);

  if (!project) return null;

  const markdown = compileMarkdown(project.content);

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
