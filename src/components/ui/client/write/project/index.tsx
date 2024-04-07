"use client";

import React, { useRef } from "react";

import dynamic from "next/dynamic";

import { useWriteProject } from "@hooks/write/project/useWriteProject";
import { useGetProjectQuery, useProjectMutation } from "@hooks/query/project";
import { useUploadImage } from "@hooks/query/image";
import ProjectHeader from "@components/ui/client/write/project/Header";
import WriteFooter from "@components/ui/client/write/Footer";
import { EImageType } from "@/types/base";

interface IProps {
  nid: number | null;
}

const Editor = dynamic(() => import("@components/ui/Markdown/editor"), { ssr: true });

const Project = ({ nid }: IProps) => {
  const { data: project } = useGetProjectQuery(nid);
  const mutate = useProjectMutation(nid);

  const [input, onChangeValue, onChangeContent] = useWriteProject(project);
  const { image, changeImage, clearImage } = useUploadImage({
    defaultImg: project?.thumbnail,
    type: EImageType.PROJECT,
  });

  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  const thumbnailHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    thumbnailRef.current?.click();
  };

  const addProject = async () => {
    const confirmProject = confirm("저장하시겠습니까?");

    if (!confirmProject) return;

    mutate({ ...input, thumbnail: image });
  };

  const { title, description, content, github, start, end, page } = input;

  return (
    <section className="frame relative mx-auto my-0 flex flex-col items-center gap-8 py-8">
      <ProjectHeader
        title={title}
        description={description}
        thumbnail={image}
        github={github}
        start={start}
        end={end}
        page={page}
        thumbnailRef={thumbnailRef}
        onChangeValue={onChangeValue}
        onChangeThumbnail={changeImage}
        thumbnailHandler={thumbnailHandler}
        clearThumbnail={clearImage}
      />
      <Editor type={EImageType.PROJECT} content={content} onChangeContent={onChangeContent} />
      <WriteFooter save={addProject} />
    </section>
  );
};

export default Project;
