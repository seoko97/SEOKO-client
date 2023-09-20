import React from "react";

import { dateTimeParser } from "@utils/dateTimeParser";
import { LikeIcon, ViewIcon } from "@components/icons";

interface IProps {
  viewCount: number;
  likeCount: number;
  createdAt: string;
}

const PostSubInfo = ({ viewCount, likeCount, createdAt }: IProps) => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4 text-sm">
      <span className="font-normal text-slate-500 dark:text-slate-400">
        {dateTimeParser(createdAt)}
      </span>
      <div className="flex items-center justify-center gap-1">
        <ViewIcon className="h-[1.2em] w-[1.2em] stroke-slate-500 dark:stroke-slate-400" />
        <span className="text-slate-500 dark:text-slate-400">{viewCount}</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <LikeIcon className="h-[1.2em] w-[1.2em] stroke-slate-500 dark:stroke-slate-400" />
        <span className="text-slate-500 dark:text-slate-400">{likeCount}</span>
      </div>
    </div>
  );
};

export default PostSubInfo;
