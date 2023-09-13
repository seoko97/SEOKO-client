import { useRef, useState } from "react";

import { IPost, IUpdatePostInput } from "@/types";

type TPostInput = Omit<IUpdatePostInput, "thumbnail">;

const POST_INPUT: TPostInput = {
  _id: undefined,
  series: undefined,
  title: "",
  content: "",
};

const getPostInput = (post: IPost | undefined): TPostInput => {
  if (!post) return { ...POST_INPUT };

  return {
    _id: post._id,
    title: post.title,
    content: post.content,
    series: post.series?.name,
  };
};

const useWritePost = (post: IPost | undefined) => {
  const postDataRef = useRef<TPostInput>(getPostInput(post));
  const dum = useState(0);

  const forceUpdate = () => dum[1]((state) => state + 1);

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof Pick<TPostInput, "title">;

    if (postDataRef.current[name] === undefined) return;

    postDataRef.current[name] = e.target.value;
  };

  const onChangeSeries = (series?: string) => {
    postDataRef.current.series = series;
    forceUpdate();
  };

  const onChangeContent = (value: string) => {
    postDataRef.current.content = value;
  };

  return [postDataRef.current, onChangeValue, onChangeSeries, onChangeContent] as const;
};

export { useWritePost };
