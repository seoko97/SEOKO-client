"use client";

import React, { useRef, useState } from "react";

import { useGetUserQuery } from "@hooks/query/user";
import { useDeleteSeriesMutation, useGetSeriesQuery } from "@hooks/query/series";
import { useGetPostsQuery } from "@hooks/query/post";
import PostList from "@components/ui/PostList";
import Navigation from "@components/ui/Navigation";
import DateTime from "@components/ui/core/DateTime";
import EditSeries from "@components/modal/series/edit";
import { ChevronIcon } from "@components/icons";

interface IProps {
  nid: number;
}

const SeriesClient = ({ nid }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useState(false);
  const [sort, setSort] = useState<1 | -1>(-1);

  const { data: username } = useGetUserQuery();
  const { data: series } = useGetSeriesQuery(nid);
  const { mutate: deleteSeries } = useDeleteSeriesMutation(nid);

  const [posts, fetchMorePosts] = useGetPostsQuery({ series: series?._id, sort });

  const onClickSortButton = () => {
    setSort((prev) => (prev === 1 ? -1 : 1));
  };

  const onDelete = () => {
    const isDelete = confirm("시리즈를 삭제하시겠습니까?");

    if (!isDelete) return;

    deleteSeries();
  };

  const onEdit = () => {
    setOpenModal(true);
  };

  if (!series) return null;

  const { name, postCount, updatedAt } = series;

  return (
    <>
      <div className="flex w-[theme(screens.md.max)] flex-col gap-2 px-0 py-4 text-primary transition-[color] sm:mb-4 md:w-full">
        <h3 className="ml-1 text-lg font-bold text-main">SERIES</h3>
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="ml-1 truncate text-sm text-primary text-slate-500 dark:text-slate-400">
          <span className="text-primary transition-[color]">{postCount}개의 포스트</span>
          <span className="mx-1">·</span>
          <span>
            마지막 업데이트 <DateTime date={updatedAt} />
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col items-end justify-center gap-4">
          {username && <Navigation onEdit={onEdit} onDelete={onDelete} />}
          <button
            className="inline-flex items-center gap-2 rounded-md bg-slate-200 p-2 shadow-sm transition-[background-color] dark:bg-slate-700"
            onClick={onClickSortButton}
          >
            <ChevronIcon
              className={`h-4 w-4 stroke-[theme(textColor.main)] transition-[stroke,transform] ${
                sort === -1 ? "rotate-180" : ""
              }`}
              strokeWidth={3.5}
            />
            <span className="text-primary transition-[color]">
              {sort === -1 ? "내림차순" : "오름차순"}
            </span>
          </button>
        </div>
        {posts.length > 0 && <PostList ref={ref} posts={posts} func={fetchMorePosts} />}
        {posts?.length === 0 && (
          <div className="py-10 text-center text-2xl font-bold text-gray-400 sm:text-xl">
            포스트를 찾을 수 없습니다 🙄
          </div>
        )}
      </div>
      {openModal && <EditSeries onClose={() => setOpenModal(false)} series={series} />}
    </>
  );
};

export default SeriesClient;
