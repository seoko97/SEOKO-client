import PostClient from "@components/ui/client/write/post";
import Hydrate from "@components/pages/WritePost/Hydrate";

interface IProps {
  params?: PageProps<"/write/post/[nid]">["params"];
}

const WritePost = async ({ params }: IProps) => {
  const paramNid = (await params)?.nid;
  const nid = paramNid ? Number(paramNid) : null;

  return (
    <Hydrate nid={nid}>
      <PostClient nid={nid} />
    </Hydrate>
  );
};

export default WritePost;
