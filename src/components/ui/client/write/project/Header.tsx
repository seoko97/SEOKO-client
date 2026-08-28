import React from "react";

import Thumbnail from "@components/ui/client/write/Thumbnail";
import ProjectInput from "@components/ui/client/write/project/Input";
import ProjectDateInput from "@components/ui/client/write/project/Date";
import { EImageType } from "@/types/base";
import { useProjectWriteContext } from "@/context/ProjectWriteContext";

const ProjectHeader = () => {
  const { dataRef, updateData } = useProjectWriteContext();

  return (
    <header className="flex w-full flex-col gap-4">
      <ProjectInput name="title" placeholder="제목을 입력하세요" />
      <ProjectInput name="description" placeholder="설명을 입력하세요" />
      <ProjectInput name="github" placeholder="깃허브 주소를 입력하세요" />
      <ProjectInput name="page" placeholder="배포 주소를 입력하세요" />
      <ProjectDateInput name="start" label="프로젝트 시작 날짜" />
      <ProjectDateInput name="end" label="프로젝트 종료 날짜" />
      <Thumbnail
        defaultValue={dataRef.current.thumbnail}
        setThumbnail={(thumbnail) => updateData("thumbnail", thumbnail)}
        type={EImageType.PROJECT}
      />
    </header>
  );
};

export default ProjectHeader;
