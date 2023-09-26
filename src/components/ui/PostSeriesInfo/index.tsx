import React, { useMemo, useState } from "react";

import Link from "next/link";

import NavigateButton from "@components/ui/PostSeriesInfo/NavigateButton";
import ListItem from "@components/ui/PostSeriesInfo/Listitem";
import { BookmarkIcon, TriangleIcon } from "@components/icons";
import { ISeries } from "@/types";

interface IProps {
  selectedPostNid: number;
  series: ISeries;
}

const PostSeriesInfo = ({ selectedPostNid, series }: IProps) => {
  const { name, posts, postCount } = series;
  const [showList, setShowList] = useState(true);

  const onClick = () => {
    setShowList((prev) => !prev);
  };

  const selectedIndex = useMemo(() => {
    return posts.findIndex(({ nid }) => nid === selectedPostNid);
  }, [selectedPostNid]);

  return (
    <div className="relative w-full rounded-lg bg-secondary px-6 py-8 shadow-sm transition-[background-color]">
      <BookmarkIcon className="absolute right-6 top-0 h-12 w-8 fill-[theme(textColor.main)] transition-[fill]" />
      <h2 className="mb-4 pr-10 text-xl font-semibold">
        <Link
          href={`/series/${series.nid}`}
          className="text-primary transition-[color] hover:text-effect1"
        >
          {name}
        </Link>
      </h2>
      {showList && (
        <ol className="flex list-inside list-decimal flex-col gap-2 marker:italic marker:text-slate-500 marker:transition-[color] dark:marker:text-slate-400">
          {posts.map((post) => (
            <ListItem key={post.nid} post={post} isSelected={post.nid === selectedPostNid} />
          ))}
        </ol>
      )}
      <div className="mt-8 flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center text-primary transition-[color] hover:text-effect1"
          onClick={onClick}
        >
          <TriangleIcon
            className={`relative -top-[1px] mr-1 inline-block h-6 w-6 ${
              showList ? "rotate-180" : ""
            } sm:hidden`}
          />
          {showList ? "숨기기" : "목록 보기"}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-primary transition-[color]">
            {selectedIndex + 1}/{postCount}
          </div>
          <div className="flex gap-1">
            <NavigateButton posts={posts} selectedIndex={selectedIndex} type="prev" />
            <NavigateButton posts={posts} selectedIndex={selectedIndex} type="next" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSeriesInfo;
