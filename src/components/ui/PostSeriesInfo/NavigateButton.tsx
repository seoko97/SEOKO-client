import React from "react";

import { useRouter } from "next/navigation";

import { ChevronIcon } from "@components/icons";
import { IPost } from "@/types";

interface IProps {
  posts: IPost[];
  selectedIndex: number;
  type: "prev" | "next";
}

const NavigateButton = ({ type, posts, selectedIndex }: IProps) => {
  const router = useRouter();

  const currentIndex = selectedIndex + (type === "prev" ? -1 : 1);

  const onClick = () => {
    if (currentIndex < 0 || currentIndex >= posts.length) return;

    const { nid } = posts[currentIndex];

    router.push(`/post/${nid}`, { scroll: false });
  };

  const rotate = type === "prev" ? "right-[1px] -rotate-90" : "left-[1px] rotate-90";

  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded-[50%] bg-slate-100 transition-[background-color] disabled:cursor-default disabled:opacity-30 dark:bg-slate-600"
      disabled={!posts[currentIndex]}
      onClick={onClick}
    >
      <ChevronIcon
        className={`relative h-4 w-4 stroke-[theme(textColor.main)] transition-[stroke] ${rotate}`}
        strokeWidth={3}
      />
    </button>
  );
};

export default NavigateButton;
