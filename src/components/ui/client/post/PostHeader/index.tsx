"use client";

import type { MouseEvent } from "react";

import { useRouter } from "next/navigation";

import { useGetUserQuery } from "@hooks/query/user";
import { useGetSeriesQuery } from "@hooks/query/series";
import { useDeletePostMutation, useGetPostQuery } from "@hooks/query/post";
import TagList from "@components/ui/TagList";
import Navigation from "@components/ui/Navigation";
import Image from "@components/ui/core/Image";
import DateTime from "@components/ui/core/DateTime";
import PostSeriesInfo from "@components/ui/client/post/PostHeader/PostSeriesInfo";
import { LikeIcon, ViewIcon } from "@components/icons";

interface IProps {
  nid: number;
}

const PostHeader = ({ nid }: IProps) => {
  const router = useRouter();
  const { data: post, dataUpdatedAt } = useGetPostQuery(nid);
  const { data: username } = useGetUserQuery();
  const { data: series } = useGetSeriesQuery(post?.series?.nid ?? null);
  const { mutate: deletePostMutate } = useDeletePostMutation(nid);

  if (!post) {
    return null;
  }

  const { title, likeCount, viewCount, thumbnail, tags, createdAt } = post;

  const editPost = () => {
    router.push(`/write/post/${nid}`);
  };

  const deletePost = () => {
    if (!username) {
      return;
    }

    const conf = confirm("삭제하시겠습니까?");

    if (!conf) {
      return;
    }

    deletePostMutate();
  };

  const onClickTag = (e: MouseEvent<HTMLDivElement>) => {
    const tagName = e.currentTarget.textContent?.trim();

    if (!tagName) {
      return;
    }

    router.push(`/tag/${encodeURIComponent(tagName)}`);
  };

  return (
    <div className="mb-2 mt-4 flex w-[theme(screens.md.max)] flex-col items-center justify-center gap-5 break-all md:w-full">
      <div className="relative aspect-default w-full overflow-hidden rounded-lg bg-gray-400 transition-[box-shadow]">
        <Image
          fill
          preload={true}
          alt="post-thumbnail"
          src={thumbnail}
          quality={100}
          sizes="(max-width: 768px) calc(100vw - 32px), 768px"
          className="rounded-lg"
        />
      </div>
      <h1 className="text-center text-xl font-bold text-primary transition-[color]">{title}</h1>
      {tags.length > 0 && <TagList className="justify-center" tags={tags} onClick={onClickTag} />}
      <div className="flex flex-wrap items-center justify-start gap-4 text-sm">
        <DateTime
          className="font-normal text-slate-500 dark:text-slate-400"
          date={createdAt}
          referenceTime={dataUpdatedAt}
        />
        <div className="flex items-center justify-center gap-1">
          <ViewIcon className="h-[1.2em] w-[1.2em] stroke-slate-500 dark:stroke-slate-400" />
          <span className="text-slate-500 dark:text-slate-400">{viewCount}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <LikeIcon className="h-[1.2em] w-[1.2em] stroke-slate-500 dark:stroke-slate-400" />
          <span className="text-slate-500 dark:text-slate-400">{likeCount}</span>
        </div>
      </div>
      {series && <PostSeriesInfo selectedPostNid={nid} series={series} />}
      {username && <Navigation onDelete={deletePost} onEdit={editPost} />}
    </div>
  );
};

export default PostHeader;
