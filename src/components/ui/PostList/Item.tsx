import React from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import removeMd from "remove-markdown";

import TagList from "@components/ui/TagList";
import PostSubInfo from "@components/ui/Post/PostHeader/PostSubInfo";
import Image from "@components/ui/core/Image";
import { IPost } from "@/types";

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps) => {
  const router = useRouter();
  const { nid, thumbnail, title, tags, content, viewCount, likeCount, createdAt } = post;
  const parsedContent = removeMd(content).substring(0, 120);

  const onClickTag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLDivElement;

    router.push(`/tag/${target.innerText}`);
  };

  return (
    <Link href={`/post/${nid}`} className="w-full">
      <div className="group relative flex w-full cursor-pointer items-center justify-center gap-8 rounded-md px-2 py-2 transition-[background-color] hover:bg-tertiary md:flex-col md:gap-0">
        <div className="relative flex w-[250px] flex-col rounded-lg bg-gray-400 transition-[box-shadow] group-hover:shadow-md md:w-full">
          <Image
            src={thumbnail}
            alt={title}
            loading="lazy"
            placeholder="blur"
            blurDataURL={thumbnail}
          />
        </div>
        <div className="flex flex-1 flex-col justify-around gap-4 break-all text-primary md:min-h-0 md:w-full md:gap-3 md:px-2 md:py-3">
          <h1 className="w-full text-lg font-medium transition-[color] group-hover:text-effect1">
            {title}
          </h1>
          <p className="mb-2 font-light transition-[color]">{parsedContent}...</p>
          {tags.length > 0 && <TagList tags={tags} onClick={onClickTag} />}
          <PostSubInfo viewCount={viewCount} likeCount={likeCount} createdAt={createdAt} />
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
