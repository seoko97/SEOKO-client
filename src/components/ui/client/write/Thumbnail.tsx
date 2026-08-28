import { useEffect, useRef } from "react";

import { useUploadImage } from "@hooks/query/image";
import Image from "@components/ui/core/Image";
import { ImageIcon } from "@components/icons";
import { EImageType } from "@/types/base";

interface IProps {
  defaultValue?: string;
  setThumbnail: (thumbnail: string) => void;
  type: EImageType;
}

const Thumbnail = ({ defaultValue, setThumbnail, type }: IProps) => {
  const thumbnailRef = useRef<HTMLInputElement | null>(null);
  const {
    image: thumbnail,
    changeImage,
    clearImage,
  } = useUploadImage({ defaultImg: defaultValue, type });

  const thumbnailHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    thumbnailRef.current?.click();
  };

  useEffect(() => {
    setThumbnail(thumbnail);
  }, [setThumbnail, thumbnail]);

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

export default Thumbnail;
