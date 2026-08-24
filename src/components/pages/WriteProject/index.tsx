import React from "react";

import ProjectClient from "@components/ui/client/write/project";

import Hydrate from "@components/pages/WriteProject/Hydrate";

interface IProps {
  params?: Promise<{ nid: number }>;
}

const WriteProject = async ({ params }: IProps) => {
  const nid = (await params)?.nid ?? null;

  return (
    <Hydrate nid={nid}>
      <ProjectClient nid={nid} />
    </Hydrate>
  );
};

export default WriteProject;
