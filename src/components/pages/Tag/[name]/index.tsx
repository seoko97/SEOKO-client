import { notFound } from "next/navigation";

import getOrNotFound from "@utils/getOrNotFound";
import PostList from "@components/ui/PostList";
import Hydrate from "@components/pages/Tag/[name]/Hydrate";
import { getTag } from "@/apis/tag";

type TProps = Pick<PageProps<"/tag/[name]">, "params">;

const Tag = async ({ params }: TProps) => {
  const { name } = await params;

  if (!name) {
    return notFound();
  }

  const tag = await getOrNotFound(() => getTag(name));

  return (
    <section className="frame mb-8 flex flex-col items-center gap-4">
      <div className="flex w-[theme(screens.md.max)] flex-col gap-2 px-0 py-4 text-primary transition-[color] sm:mb-4 md:w-full">
        <h3 className="ml-1 text-lg font-bold text-main">TAG</h3>
        <h1 className="text-4xl font-bold">{tag.name}</h1>
        <div className="ml-1 truncate text-sm text-primary text-slate-500 dark:text-slate-400">
          <span className="text-primary transition-[color]">{tag.postCount}개의 포스트</span>
        </div>
      </div>
      <Hydrate tagId={tag._id}>
        <PostList params={{ tag: tag._id }} />
      </Hydrate>
    </section>
  );
};

export default Tag;
