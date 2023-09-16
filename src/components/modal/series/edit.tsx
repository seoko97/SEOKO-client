import React, { useRef } from "react";

import useInput from "@hooks/useInput";
import { useUpdateSeriesMutation } from "@hooks/query/series";
import { useUploadImage } from "@hooks/query/image";
import Input from "@components/ui/core/Input";
import Image from "@components/ui/core/Image";
import Button from "@components/ui/core/Button";
import ModalLayout from "@components/modal/ModalLayout";
import { ImageIcon } from "@components/icons";
import { ISeries } from "@/types";

interface IProps {
  series: ISeries;
  onClose: () => void;
}

const EditSeries = ({ series, onClose }: IProps) => {
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const { name, thumbnail, nid } = series;

  const { mutate: updateSeries } = useUpdateSeriesMutation(nid);
  const [input, onChangeInput] = useInput({ name });

  const { image, changeImage, clearImage } = useUploadImage({
    defaultImg: thumbnail,
    type: "series",
  });

  const thumbnailHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    thumbnailRef.current?.click();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const confirmUpdate = confirm("수정하시겠습니까?");

    if (!confirmUpdate) return;

    updateSeries({ ...input, thumbnail: image });
    onClose();
  };

  return (
    <ModalLayout onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="z-[60] flex h-fit max-h-[600px] w-[600px] flex-col gap-4 rounded-md bg-tertiary px-5 py-7 shadow-md transition-[background-color] md:w-full"
      >
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-lg font-semibold text-primary">시리즈 이름</h3>
          <Input
            name="name"
            defaultValue={name}
            placeholder="시리즈 이름을 입력하세요"
            className="w-auto flex-1"
            onChange={onChangeInput}
          />
        </div>
        <h3 className="text-xl font-semibold text-primary">썸네일</h3>
        <div className="flex items-center gap-4">
          <div className="w-[200px] cursor-pointer md:w-full">
            {image && <Image src={image} alt="thumbnail" onClick={clearImage} />}
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
        <div className="flex gap-4 [&>button]:flex-1">
          <Button type="button" buttonType="danger" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" buttonType="primary">
            확인
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditSeries;
