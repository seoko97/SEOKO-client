import removeMd from "remove-markdown";

import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import TagList from "@components/ui/TagList";
import Image from "@components/ui/core/Image";
import DateTime from "@components/ui/core/DateTime";
import { LikeIcon, ViewIcon } from "@components/icons";
import { IPost } from "@/types";

interface IProps {
  post: IPost;
  referenceTime: number;
}

const PostItem = ({ post, referenceTime }: IProps) => {
  const router = useRouter();
  const { nid, thumbnail, title, tags, content, viewCount, likeCount, createdAt } = post;
  const parsedContent = removeMd(content).substring(0, 120);

  const onClickTag = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLDivElement;

    router.push(`/tag/${target.innerText}`);
  };

  return (
    <Link href={`/post/${nid}`} className="w-full">
      <div className="group relative flex w-full cursor-pointer items-center justify-center gap-8 rounded-md px-2 py-2 transition-[background-color] hover:bg-tertiary md:flex-col md:gap-0">
        <div className="relative flex aspect-default w-[250px] flex-col rounded-lg bg-gray-400 transition-[box-shadow] group-hover:shadow-md md:w-full">
          <Image
            fill
            src={thumbnail}
            alt={title}
            sizes="(max-width: 768px) calc(100vw - 48px), 250px"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col justify-around gap-4 break-all text-primary md:min-h-0 md:w-full md:gap-3 md:px-2 md:py-3">
          <h1 className="w-full text-lg font-medium transition-[color] group-hover:text-effect1">
            {title}
          </h1>
          <p className="mb-2 font-light transition-[color]">{parsedContent}...</p>
          {tags.length > 0 && <TagList tags={tags} onClick={onClickTag} />}
          <div className="flex flex-wrap items-center justify-start gap-4 text-sm">
            <DateTime
              className="font-normal text-slate-500 dark:text-slate-400"
              date={createdAt}
              referenceTime={referenceTime}
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
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
