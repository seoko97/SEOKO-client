import React from "react";

import NextImage, { ImageProps } from "next/image";

const Image = ({ width, height, className = "", ...rest }: ImageProps) => {
  return (
    <NextImage
      style={{ objectFit: "cover" }}
      className={`relative h-auto max-w-full ${className}`}
      quality={100}
      sizes="(max-width: 980px) 980px, 768px, 50vw, 33vw"
      width={rest.fill ? undefined : width ?? 1000}
      height={rest.fill ? undefined : height ?? 1000}
      {...rest}
    />
  );
};

export default Image;
