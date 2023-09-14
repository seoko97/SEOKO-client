import React from "react";

import Image from "@components/ui/core/Image";
import { ImageIcon } from "@components/icons";
import { IProjectInput } from "@/types";

interface IProps extends Omit<IProjectInput, "content"> {
  onChangeValue: React.ChangeEventHandler;
  onChangeThumbnail: React.ChangeEventHandler;
  thumbnailHandler: React.MouseEventHandler;
  clearThumbnail: React.MouseEventHandler;
  thumbnailRef: React.MutableRefObject<HTMLInputElement | null>;
}

const TEXT_INPUT_CLASS_NAME =
  "w-auto flex-1 bg-primary px-2 py-3 text-xl font-semibold text-primary outline-none transition-[color,background-color]";

const Header = (props: IProps) => {
  const {
    title,
    description,
    thumbnail,
    github,
    start,
    end,
    page,
    thumbnailRef,
    onChangeValue,
    onChangeThumbnail,
    thumbnailHandler,
    clearThumbnail,
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
      <input
        name="description"
        className={TEXT_INPUT_CLASS_NAME}
        defaultValue={description}
        onChange={onChangeValue}
        placeholder="설명을 입력하세요"
      />
      <input
        name="github"
        className={TEXT_INPUT_CLASS_NAME}
        defaultValue={github}
        onChange={onChangeValue}
        placeholder="깃허브 주소를 입력하세요"
      />
      <input
        name="github"
        className={TEXT_INPUT_CLASS_NAME}
        defaultValue={page ?? ""}
        onChange={onChangeValue}
        placeholder="배포 주소를 입력하세요"
      />
      <div className="text-primary transition-[color]">
        <span>프로젝트 시작 날짜 : </span>
        <input
          name="start"
          type="date"
          placeholder="YYYY-MM-DD"
          defaultValue={start}
          onChange={onChangeValue}
          className="rounded-md bg-secondary p-2 transition-[background-color]"
        />
      </div>
      <div className="text-primary transition-[color]">
        <span>프로젝트 종료 날짜 : </span>
        <input
          name="end"
          type="date"
          placeholder="YYYY-MM-DD"
          defaultValue={end ?? ""}
          onChange={onChangeValue}
          className="rounded-md bg-secondary p-2 transition-[background-color]"
        />
      </div>
      <h3 className="text-xl font-semibold text-primary transition-[color]">썸네일</h3>
      <div className="flex items-center gap-4">
        <div className="w-[200px] md:w-full">
          {thumbnail && <Image src={thumbnail} alt="thumbnail" onClick={clearThumbnail} />}
        </div>
        <span onClick={thumbnailHandler}>
          <ImageIcon className="h-16 w-16 cursor-pointer fill-[theme(textColor.primary)] transition-[fill] hover:opacity-50" />
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

export default Header;
