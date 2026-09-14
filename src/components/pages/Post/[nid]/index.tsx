import PostHeader from "@components/ui/client/post/PostHeader";
import PostFooter from "@components/ui/client/post/PostFooter";
import PostContent from "@components/ui/client/post/PostContent";
import Hydrate from "@components/pages/Post/[nid]/Hydrate";

type TProps = Pick<PageProps<"/post/[nid]">, "params">;

const Post = async ({ params }: TProps) => {
  const { nid: paramNid } = await params;
  const nid = Number(paramNid);

  return (
    <section className="frame relative flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <Hydrate nid={nid}>
        <PostHeader nid={nid} />
        <PostContent nid={nid} />
        <PostFooter nid={nid} />
      </Hydrate>
    </section>
  );
};

export default Post;
