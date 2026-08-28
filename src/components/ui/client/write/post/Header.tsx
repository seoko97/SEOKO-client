import Thumbnail from "@components/ui/client/write/Thumbnail";
import TitleEditor from "@components/ui/client/write/post/Title";
import TagEditor from "@components/ui/client/write/post/Tag";
import SeriesEditor from "@components/ui/client/write/post/Series";
import { EImageType } from "@/types/base";
import { usePostWriteContext } from "@/context/PostWriteContext";

const PostHeader = () => {
  const { dataRef, updateData } = usePostWriteContext();

  return (
    <header className="flex w-full flex-col gap-4">
      <TitleEditor />
      <TagEditor />
      <SeriesEditor />
      <Thumbnail
        defaultValue={dataRef.current.thumbnail}
        setThumbnail={(thumbnail) => updateData("thumbnail", thumbnail)}
        type={EImageType.POST}
      />
    </header>
  );
};

export default PostHeader;
