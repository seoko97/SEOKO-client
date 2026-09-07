import SeriesClient from "@components/pages/Series/[nid]/page.client";
import Hydrate from "@components/pages/Series/[nid]/Hydrate";

type TProps = Pick<PageProps<"/series/[nid]">, "params">;

const Series = async ({ params }: TProps) => {
  const { nid: paramNid } = await params;
  const nid = Number(paramNid);

  return (
    <section className="frame mb-8 flex flex-col items-center gap-4">
      <Hydrate nid={nid}>
        <SeriesClient nid={nid} />
      </Hydrate>
    </section>
  );
};

export default Series;
