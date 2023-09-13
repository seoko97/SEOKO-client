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
  end: "",
};

const useWriteProject = (project?: TProject) => {
  const defaultInput = project ?? PROJECT_INPUT;

  const projectDataRef = useRef<TProjectInputOmitThumbnail>(defaultInput);

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof Pick<TProjectInputOmitThumbnail, "title">;

    if (projectDataRef.current[name] === undefined) return;

    projectDataRef.current[name] = e.target.value;
  };

  const onChangeContent = (value: string) => {
    projectDataRef.current.content = value;
  };

  return [projectDataRef.current, onChangeValue, onChangeContent] as const;
};

export { useWriteProject };
