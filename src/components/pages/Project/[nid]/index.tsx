import ProjectClient from "@components/pages/Project/[nid]/page.client";
import Hydrate from "@components/pages/Project/[nid]/Hydrate";

type TProps = Pick<PageProps<"/project/[nid]">, "params">;

const Project = async ({ params }: TProps) => {
  const { nid: paramNid } = await params;
  const nid = Number(paramNid);

  return (
    <section className="frame flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <Hydrate nid={nid}>
        <ProjectClient nid={nid} />
      </Hydrate>
    </section>
  );
};

export default Project;
