import { useCallback, useRef } from "react";

import { IPost, IUpdatePostInput } from "@/types";

type TPostInput = Omit<IUpdatePostInput, "thumbnail">;

const POST_INPUT: TPostInput = {
  _id: undefined,
  title: "",
  content: "",
};

const getPostInput = (post: IPost | undefined): TPostInput => {
  if (!post) return { ...POST_INPUT };

  return {
    _id: post._id,
    title: post.title,
    content: post.content,
  };
};

const useWritePost = (post: IPost | undefined) => {
  const postDataRef = useRef<TPostInput>(getPostInput(post));

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const name = e.target.name as keyof Pick<TPostInput, "title">;

      if (postDataRef.current[name] === undefined) return;

      postDataRef.current[name] = e.target.value;
    },
    [postDataRef],
  );

  const onChangeContent = useCallback(
    (value: string) => {
      postDataRef.current.content = value;
    },
    [postDataRef],
  );

  return [postDataRef, onChangeValue, onChangeContent] as const;
};

export { useWritePost };
