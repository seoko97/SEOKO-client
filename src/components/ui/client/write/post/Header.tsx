import React from "react";

import TitleEditor from "@components/ui/client/write/post/Title";
import ThumbnailEditor from "@components/ui/client/write/post/Thumbnail";
import TagEditor from "@components/ui/client/write/post/Tag";
import SeriesEditor from "@components/ui/client/write/post/Series";

const PostHeader = () => {
  return (
    <header className="flex w-full flex-col gap-4">
      <TitleEditor />
      <TagEditor />
      <SeriesEditor />
      <ThumbnailEditor />
    </header>
  );
};

export default PostHeader;
