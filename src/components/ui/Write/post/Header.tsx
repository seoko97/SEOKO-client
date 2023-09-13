import React from "react";

import Tag from "@components/ui/TagList/item";
import Image from "@components/ui/core/Image";
import Button from "@components/ui/core/Button";
import { ImageIcon } from "@components/icons";

interface IProps {
  title: string;
  tags: string[];
  thumbnail?: string | null;
  series?: string | null;
  openSeriesModal: () => void;
  clearSeries: () => void;
  tagHandler: React.KeyboardEventHandler;
  onClickTag: React.MouseEventHandler;
  onChangeValue: React.ChangeEventHandler;
  onChangeThumbnail: React.ChangeEventHandler;
  thumbnailHandler: React.MouseEventHandler;
  clearThumbnail: React.MouseEventHandler;
  thumbnailRef: React.MutableRefObject<HTMLInputElement | null>;
}

const TEXT_INPUT_CLASS_NAME =
  "w-auto flex-1 bg-primary px-2 py-3 text-xl font-semibold text-primary outline-none transition-[color,background-color]";

const PostHeader = (props: IProps) => {
  const {
    title,
    tags,
    thumbnailRef,
    thumbnail,
    series,
    tagHandler,
    onClickTag,
    thumbnailHandler,
    onChangeValue,
    onChangeThumbnail,
    clearThumbnail,
    openSeriesModal,
    clearSeries,
  } = props;

  return (
    <header className="flex w-full flex-col gap-4">
      <input
        name="title"
        className={TEXT_INPUT_CLASS_NAME}
        defaultValue={title}
        onChange={onChangeValue}
        placeholder="제목을 입력하세요"
      />
      <div className="flex flex-wrap items-center  gap-1">
        {tags.map((tag, index) => (
          <Tag key={index} onClick={onClickTag}>
            {tag}
          </Tag>
        ))}
        <input
          className={TEXT_INPUT_CLASS_NAME}
          onChange={onChangeValue}
          onKeyDown={tagHandler}
          placeholder="태그를 입력하세요"
        />
      </div>
      <h3 className="text-xl font-semibold text-primary">시리즈</h3>
      <div className="flex items-center gap-4 text-primary">
        {series && <p>{series}</p>}
        <div className="flex gap-2">
          <Button buttonType="primary" onClick={openSeriesModal}>
            {series ? "변경" : "추가"}
          </Button>
          {series && (
            <Button buttonType="danger" onClick={clearSeries}>
              제거
            </Button>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-primary">썸네일</h3>
      <div className="flex items-center gap-4">
        <div className="w-[200px] md:w-full">
          {thumbnail && <Image src={thumbnail} alt="thumbnail" onClick={clearThumbnail} />}
        </div>
        <span onClick={thumbnailHandler}>
          <ImageIcon className="h-16 w-16 cursor-pointer fill-[theme(textColor.primary)] hover:opacity-50" />
        </span>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          ref={thumbnailRef}
          style={{ display: "none" }}
          onChange={onChangeThumbnail}
        />
      </div>
    </header>
  );
};

export default PostHeader;
