import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { TImageType } from "@/types/base";
import { uploadImage } from "@/apis/image";

interface IProps {
  defaultImg?: string;
  type: TImageType;
}

const useUploadImageMutation = (type: TImageType) => {
  return useMutation({
    mutationFn: (file: FormData) => uploadImage(type, file),
  });
};

const useUploadImage = ({ type, defaultImg }: IProps) => {
  const [image, setImage] = useState<string>(defaultImg || "/main.jpg");

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    return uploadImage(type, formData);
  };

  const clearImage = () => {
    setImage("/main.jpg");
  };

  const { mutate } = useMutation({
    mutationFn: onChangeImage,
    onSuccess: (data) => {
      if (!data) return;

      setImage(data);
    },
  });

  return { image, changeImage: mutate, clearImage };
};

export { useUploadImage, useUploadImageMutation };
