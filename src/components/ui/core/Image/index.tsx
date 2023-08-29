import React from "react";

import NextImage, { ImageProps } from "next/image";

const Image = ({ width, height, ...rest }: ImageProps) => {
  return (
    <NextImage
      {...rest}
      className={`relative aspect-[130/100] h-auto max-w-full rounded-lg object-cover  ${rest.className}`}
      quality={100}
      width={rest.fill ? undefined : width ?? 1000}
      height={rest.fill ? undefined : height ?? 1000}
    />
  );
};

export default Image;
