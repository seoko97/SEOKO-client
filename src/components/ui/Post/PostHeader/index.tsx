"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { useGetUserQuery } from "@hooks/query/user";
import { useDeletePostMutation, useGetPostQuery } from "@hooks/query/post";
import TagList from "@components/ui/TagList";
import PostSubInfo from "@components/ui/Post/PostHeader/PostSubInfo";
import Navigation from "@components/ui/Navigation";
import Image from "@components/ui/core/Image";

interface IProps {
  nid: number;
}

const PostHeader = ({ nid }: IProps) => {
  const router = useRouter();
  const { data } = useGetPostQuery(nid);
  const { data: username } = useGetUserQuery();
  const { mutate: deletePostMutate } = useDeletePostMutation(nid);

  if (!data) return null;

  const { title, likeCount, viewCount, thumbnail, tags, createdAt } = data;

  const editPost = () => {
    router.push(`/write/post/${nid}`);
  };

  const deletePost = () => {
    if (!username) return;

    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deletePostMutate();
  };

  const onClickTag = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    router.push(`/tag/${target.innerText}`);
  };

  return (
    <div className="mt-8 flex w-[theme(screens.md.max)] flex-col items-center justify-center gap-5 break-all md:w-full">
      <Image src={thumbnail} alt="post-thumbnail" />
      <h1 className="text-xl font-bold text-primary transition-[color]">{title}</h1>
      {tags.length > 0 && <TagList className="justify-center" tags={tags} onClick={onClickTag} />}
      <PostSubInfo viewCount={viewCount} likeCount={likeCount} createdAt={createdAt} />
      {username && <Navigation onDelete={deletePost} onEdit={editPost} />}
    </div>
  );
};

export default PostHeader;
