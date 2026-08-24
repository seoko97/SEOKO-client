import React from "react";

import ProjectClient from "@components/pages/Project/[nid]/page.client";
import Hydrate from "@components/pages/Project/[nid]/Hydrate";

interface IProps {
  params: Promise<{ nid: number }>;
}

const Project = async ({ params }: IProps) => {
  const { nid } = await params;
  const nidNumber = Number(nid);

  return (
    <section className="frame flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <Hydrate nid={nidNumber}>
        <ProjectClient nid={nidNumber} />
      </Hydrate>
    </section>
  );
};

export default Project;
