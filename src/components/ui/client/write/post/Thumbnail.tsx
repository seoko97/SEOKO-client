import { useEffect, useRef } from "react";

import { useUploadImage } from "@hooks/query/image";
import Image from "@components/ui/core/Image";

import { ImageIcon } from "@components/icons";
import { EImageType } from "@/types/base";
import { usePostWriteContext } from "@/context/PostWriteContext";

const ThumbnailEditor = () => {
  const { dataRef, updateData } = usePostWriteContext();
  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  const {
    image: thumbnail,
    changeImage,
    clearImage,
  } = useUploadImage({
    defaultImg: dataRef.current.thumbnail,
    type: EImageType.POST,
  });

  const thumbnailHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    thumbnailRef.current?.click();
  };

  useEffect(() => {
    updateData("thumbnail", thumbnail);
  }, [thumbnail, updateData]);

  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-xl font-semibold text-primary">썸네일</h3>
      <div className="flex items-center gap-4">
        <div className="w-[200px] md:w-full">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt="thumbnail"
              onClick={clearImage}
              className="aspect-default cursor-pointer rounded-lg"
            />
          )}
        </div>
        <span onClick={thumbnailHandler}>
          <ImageIcon className="h-16 w-16 cursor-pointer fill-[theme(textColor.primary)] hover:opacity-50" />
        </span>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          ref={thumbnailRef}
          style={{ display: "none" }}
          onChange={changeImage}
        />
      </div>
    </div>
  );
};

export default ThumbnailEditor;
