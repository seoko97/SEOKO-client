import React from "react";

import SeriesClient from "@components/pages/Series/[nid]/page.client";
import Hydrate from "@components/pages/Series/[nid]/Hydrate";

interface IProps {
  params: Promise<{ nid: number }>;
}

const Series = async ({ params }: IProps) => {
  const { nid } = await params;
  const nidNumber = Number(nid);

  return (
    <section className="frame mb-8 flex flex-col items-center gap-4">
      <Hydrate nid={nidNumber}>
        <SeriesClient nid={nidNumber} />
      </Hydrate>
    </section>
  );
};

export default Series;
