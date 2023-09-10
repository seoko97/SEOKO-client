import React from "react";

import NextImage, { ImageProps } from "next/image";

const Image = ({ width, height, className = "", ...rest }: ImageProps) => {
  return (
    <NextImage
      {...rest}
      style={{ objectFit: "cover" }}
      className={`relative aspect-[150/100] h-auto max-w-full rounded-lg ${className}`}
      quality={100}
      width={rest.fill ? undefined : width ?? 1000}
      height={rest.fill ? undefined : height ?? 1000}
    />
  );
};

export default Image;
