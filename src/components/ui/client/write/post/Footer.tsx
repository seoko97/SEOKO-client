import { usePostMutation } from "@hooks/query/post";
import WriteFooter from "@components/ui/client/write/Footer";
import { ICreatePostInput, IPost, IUpdatePostInput } from "@/types";
import { usePostWriteContext } from "@/context/PostWriteContext";

interface IProps {
  nid: number | null;
  post?: IPost;
}

const PostFooter = ({ nid, post }: IProps) => {
  const { dataRef } = usePostWriteContext();

  const mutate = usePostMutation(nid);

  const addPost = () => {
    const confirmPost = confirm("저장하시겠습니까?");

    if (!confirmPost) return;

    const { tags, ...postInput } = dataRef.current;

    if (post) {
      const initialTags = post.tags.map((tag) => tag.name);
      const input: IUpdatePostInput = {
        ...postInput,
        _id: post._id,
        addTags: tags.filter((tag) => !initialTags.includes(tag)),
        deleteTags: initialTags.filter((tag) => !tags.includes(tag)),
      };

      mutate<IUpdatePostInput>(input);

      return;
    }

    const input: ICreatePostInput = { ...postInput, tags };

    mutate<ICreatePostInput>(input);
  };

  return <WriteFooter save={addPost} />;
};

export default PostFooter;
