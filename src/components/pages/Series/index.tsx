import React from "react";

import SeriesClient from "@components/pages/Series/page.client";
import Hydrate from "@components/pages/Series/Hydrate";

const Series = () => {
  return (
    <section className="frame mb-8 flex flex-col items-center">
      <Hydrate>
        <SeriesClient />
      </Hydrate>
    </section>
  );
};

export default Series;
