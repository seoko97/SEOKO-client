import React from "react";

import SeriesClient from "@components/pages/Series/[nid]/page.client";
import Hydrate from "@components/pages/Series/[nid]/Hydrate";

interface IProps {
  params: {
    nid: number;
  };
}

const Series = ({ params }: IProps) => {
  const nid = Number(params.nid);

  return (
    <section className="frame mb-8 flex flex-col items-center gap-4">
      <Hydrate nid={nid}>
        <SeriesClient nid={nid} />
      </Hydrate>
    </section>
  );
};

export default Series;
