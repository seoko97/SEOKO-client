"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { useGetUserQuery } from "@hooks/query/user";
import { useGetSeriesQuery } from "@hooks/query/series";
import { useDeletePostMutation, useGetPostQuery } from "@hooks/query/post";
import TagList from "@components/ui/TagList";
import PostSeriesInfo from "@components/ui/PostSeriesInfo";
import PostSubInfo from "@components/ui/Post/PostHeader/PostSubInfo";
import Navigation from "@components/ui/Navigation";
import Image from "@components/ui/core/Image";

interface IProps {
  nid: number;
}

const PostHeader = ({ nid }: IProps) => {
  const router = useRouter();
  const { data: post } = useGetPostQuery(nid);
  const { data: username } = useGetUserQuery();
  const { data: series } = useGetSeriesQuery(post?.series?.nid);
  const { mutate: deletePostMutate } = useDeletePostMutation(nid);

  if (!post) return null;

  const { title, likeCount, viewCount, thumbnail, tags, createdAt } = post;

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
    <div className="mb-2 mt-4 flex w-[theme(screens.md.max)] flex-col items-center justify-center gap-5 break-all md:w-full">
      <Image src={thumbnail} alt="post-thumbnail" priority />
      <h1 className="text-xl font-bold text-primary transition-[color]">{title}</h1>
      {tags.length > 0 && <TagList className="justify-center" tags={tags} onClick={onClickTag} />}
      <PostSubInfo viewCount={viewCount} likeCount={likeCount} createdAt={createdAt} />
      {series && <PostSeriesInfo selectedPostNid={nid} series={series} />}
      {username && <Navigation onDelete={deletePost} onEdit={editPost} />}
    </div>
  );
};

export default PostHeader;
