import React from "react";

import ProjectClient from "@components/ui/Write/project";
import Hydrate from "@components/pages/WriteProject/Hydrate";

interface IProps {
  params?: {
    nid: number;
  };
}

const WriteProject = ({ params }: IProps) => {
  const nid = params?.nid === undefined ? null : Number(params.nid);

  return (
    <Hydrate nid={nid}>
      <ProjectClient nid={nid} />
    </Hydrate>
  );
};

export default WriteProject;
