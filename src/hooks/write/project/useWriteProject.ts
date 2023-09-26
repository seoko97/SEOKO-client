import { useRef } from "react";

import { IProjectInput, TProject } from "@/types";

type TProjectInputOmitThumbnail = Omit<IProjectInput, "thumbnail">;

const PROJECT_INPUT: TProjectInputOmitThumbnail = {
  _id: undefined,
  title: "",
  description: "",
  github: "",
  content: "",
  start: "",
  end: null,
  page: null,
};

const getProjectInput = (project?: TProject): TProjectInputOmitThumbnail => {
  if (!project) return PROJECT_INPUT;

  const { title, description, github, content, start, end, page } = project;

  return { title, description, github, content, start, end, page };
};

const useWriteProject = (project?: TProject) => {
  const defaultInput = getProjectInput(project);

  const projectDataRef = useRef<TProjectInputOmitThumbnail>(defaultInput);

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof TProjectInputOmitThumbnail;

    if (projectDataRef.current[name] === undefined) return;

    if (name === "end" || name === "page") {
      projectDataRef.current[name] = e.target.value || null;
    } else {
      projectDataRef.current[name] = e.target.value;
    }
  };

  const onChangeContent = (value: string) => {
    projectDataRef.current.content = value;
  };

  return [projectDataRef.current, onChangeValue, onChangeContent] as const;
};

export { useWriteProject };
