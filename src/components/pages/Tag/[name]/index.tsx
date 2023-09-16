import React from "react";

import TagClient from "@components/pages/Tag/[name]/page.client";
import Hydrate from "@components/pages/Tag/[name]/Hydrate";

interface IProps {
  params: {
    name: string;
  };
}

const Tag = ({ params }: IProps) => {
  const name = params.name;

  return (
    <section className="frame mb-8 flex flex-col items-center gap-4">
      <Hydrate name={name}>
        <TagClient name={name} />
      </Hydrate>
    </section>
  );
};

export default Tag;
