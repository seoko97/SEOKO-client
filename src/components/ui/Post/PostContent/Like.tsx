import React from "react";

import { useLikePostMutation, useUnlikePostMutation } from "@hooks/query/post";
import { LikeIcon } from "@components/icons";

interface IProps {
  nid: number;
  isLiked: boolean;
}

const Like = ({ nid, isLiked }: IProps) => {
  const { mutate: like } = useLikePostMutation(nid);
  const { mutate: unlike } = useUnlikePostMutation(nid);

  const fill = isLiked ? "[&>path]:fill-[url(#a)]" : "[&>path]:fill-slate-400";

  const onClick = () => {
    const mutate = isLiked ? unlike : like;

    mutate();
  };

  return (
    <div
      onClick={onClick}
      className="mr-12 cursor-pointer rounded-[50%] bg-gray-50 p-2 shadow-md transition-[transform,background-color,box-shadow] hover:-translate-y-1 hover:transform hover:shadow-lg dark:bg-slate-700 xl:mr-0"
    >
      <LikeIcon className={`relative ${fill} top-[1px] h-10 w-10`}>
        <defs>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="a">
            <stop offset="0%" style={{ stopColor: "#86caf4", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#c58ff7", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </LikeIcon>
    </div>
  );
};

export default Like;
