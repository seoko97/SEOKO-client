"use client";

import React, { useRef, useState } from "react";

import dynamic from "next/dynamic";

import { useWriteTag } from "@hooks/write/post/useWriteTag";
import { useWritePost } from "@hooks/write/post/useWritePost";
import { useGetPostQuery, usePostMutation } from "@hooks/query/post";
import { useUploadImage } from "@hooks/query/image";
import PostHeader from "@components/ui/client/write/post/Header";
import WriteFooter from "@components/ui/client/write/Footer";
import SeriesList from "@components/modal/series/list";
import { EImageType } from "@/types/base";

interface IProps {
  nid: number | null;
}

const Editor = dynamic(() => import("@components/ui/Markdown/editor"), { ssr: true });

const Post = ({ nid }: IProps) => {
  const { data: post } = useGetPostQuery(nid);
  const mutate = usePostMutation(nid);

  const [openSeries, setOpenSeries] = useState(false);
  const [postInput, onChangeValue, onChangeSeries, onChangeContent] = useWritePost(post);
  const [tags, deletedTags, addedTags, tagHandler, onClickTag] = useWriteTag(post);
  const { image, changeImage, clearImage } = useUploadImage({
    defaultImg: post?.thumbnail,
    type: EImageType.POST,
  });

  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  const thumbnailHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    thumbnailRef.current?.click();
  };

  const addPost = async () => {
    const confirmPost = confirm("저장하시겠습니까?");

    if (!confirmPost) return;

    const input = {
      ...postInput,
      thumbnail: image,
      addTags: post ? addedTags : undefined,
      deleteTags: post ? deletedTags : undefined,
      tags: !post ? tags : undefined,
    };

    mutate(input);
  };

  return (
    <>
      <div className="frame relative mx-auto my-0 flex flex-col items-center gap-8 py-8">
        <PostHeader
          title={postInput.title}
          tags={tags}
          thumbnail={image}
          series={postInput.series}
          thumbnailRef={thumbnailRef}
          openSeriesModal={() => setOpenSeries(true)}
          clearSeries={() => onChangeSeries(undefined)}
          tagHandler={tagHandler}
          onClickTag={onClickTag}
          onChangeValue={onChangeValue}
          onChangeThumbnail={changeImage}
          thumbnailHandler={thumbnailHandler}
          clearThumbnail={clearImage}
        />
        <Editor
          type={EImageType.POST}
          content={postInput.content}
          onChangeContent={onChangeContent}
        />
        <WriteFooter save={addPost} />
      </div>
      {openSeries && (
        <SeriesList
          onChangeSeries={onChangeSeries}
          onClose={() => setOpenSeries(false)}
          defaultSeries={postInput.series}
        />
      )}
    </>
  );
};

export default Post;
