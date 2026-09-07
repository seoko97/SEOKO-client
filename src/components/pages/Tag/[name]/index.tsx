import TagClient from "@components/pages/Tag/[name]/page.client";
import Hydrate from "@components/pages/Tag/[name]/Hydrate";

type TProps = Pick<PageProps<"/tag/[name]">, "params">;

const Tag = async ({ params }: TProps) => {
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
