import React from "react";

import ProjectClient from "@components/pages/Project/[nid]/page.client";
import Hydrate from "@components/pages/Project/[nid]/Hydrate";

interface IProps {
  params: {
    nid: number;
  };
}

const Project = ({ params }: IProps) => {
  const nid = Number(params.nid);

  return (
    <section className="frame flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <Hydrate nid={nid}>
        <ProjectClient nid={nid} />
      </Hydrate>
    </section>
  );
};

export default Project;
