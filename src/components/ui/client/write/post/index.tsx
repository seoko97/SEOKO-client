"use client";

import dynamic from "next/dynamic";

import { useGetPostQuery } from "@hooks/query/post";
import PostHeader from "@components/ui/client/write/post/Header";
import PostFooter from "@components/ui/client/write/post/Footer";
import { EImageType } from "@/types/base";
import { IPost, IPostWriteInput } from "@/types";
import { PostWriteProvider, usePostWriteContext } from "@/context/PostWriteContext";

interface IProps {
  nid: number | null;
}

const getPostInput = (post: IPost | undefined): IPostWriteInput => {
  if (!post) {
    return { title: "", content: "", tags: [], thumbnail: "" };
  }

  return {
    title: post.title,
    content: post.content,
    thumbnail: post.thumbnail,
    tags: post.tags.map((tag) => tag.name),
    series: post.series?.name,
  };
};

const Editor = dynamic(() => import("@components/ui/Markdown/editor"), { ssr: true });

const PostEditor = () => {
  const { dataRef, updateData } = usePostWriteContext();

  return (
    <Editor
      type={EImageType.POST}
      content={dataRef.current.content}
      onChangeContent={(content) => updateData("content", content)}
    />
  );
};

const Post = ({ nid }: IProps) => {
  const { data: post } = useGetPostQuery(nid);

  return (
    <PostWriteProvider key={post?._id ?? "new"} initialData={getPostInput(post)}>
      <div className="frame relative mx-auto my-0 flex flex-col items-center gap-8 py-8">
        <PostHeader />
        <PostEditor />
        <PostFooter nid={nid} post={post} />
      </div>
    </PostWriteProvider>
  );
};

export default Post;
