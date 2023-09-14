import React from "react";

import ProjectClient from "@components/pages/Project/page.client";
import Hydrate from "@components/pages/Project/Hydrate";

const Project = () => {
  return (
    <section className="frame mb-8 flex flex-col gap-8">
      <Hydrate>
        <ProjectClient />
      </Hydrate>
    </section>
  );
};

export default Project;
