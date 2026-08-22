import React from "react";

import TagClient from "@components/pages/Tag/[name]/page.client";
import Hydrate from "@components/pages/Tag/[name]/Hydrate";

interface IProps {
  params: Promise<{ name: string }>;
}

const Tag = async ({ params }: IProps) => {
  const { name } = await params;

  return (
    <section className="frame mb-8 flex flex-col items-center gap-4">
      <Hydrate name={name}>
        <TagClient name={name} />
      </Hydrate>
    </section>
  );
};

export default Tag;
