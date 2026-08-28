"use client";

import dynamic from "next/dynamic";

import { useGetProjectQuery } from "@hooks/query/project";
import ProjectHeader from "@components/ui/client/write/project/Header";
import ProjectFooter from "@components/ui/client/write/project/Footer";
import { EImageType } from "@/types/base";
import { IProjectInput, TProject } from "@/types";
import { ProjectWriteProvider, useProjectWriteContext } from "@/context/ProjectWriteContext";

interface IProps {
  nid: number | null;
}

const PROJECT_INPUT: IProjectInput = {
  title: "",
  description: "",
  github: "",
  content: "",
  start: "",
  thumbnail: "",
  end: null,
  page: null,
};

const getProjectInput = (project?: TProject): IProjectInput => {
  if (!project) return { ...PROJECT_INPUT };

  const { title, description, content, thumbnail, github, page, start, end } = project;

  return { title, description, content, thumbnail, github, page, start, end };
};

const Editor = dynamic(() => import("@components/ui/Markdown/editor"), { ssr: true });

const ProjectEditor = () => {
  const { dataRef, updateData } = useProjectWriteContext();

  return (
    <Editor
      type={EImageType.PROJECT}
      content={dataRef.current.content}
      onChangeContent={(content) => updateData("content", content)}
    />
  );
};

const Project = ({ nid }: IProps) => {
  const { data: project } = useGetProjectQuery(nid);

  return (
    <ProjectWriteProvider key={`project-${nid ?? "new"}`} initialData={getProjectInput(project)}>
      <section className="frame relative mx-auto my-0 flex flex-col items-center gap-8 py-8">
        <ProjectHeader />
        <ProjectEditor />
        <ProjectFooter nid={nid} />
      </section>
    </ProjectWriteProvider>
  );
};

export default Project;
