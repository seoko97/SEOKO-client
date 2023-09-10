import React from "react";

import NextImage, { ImageProps } from "next/image";

const img = (props: ImageProps) => {
  const { alt, ...rest } = props;

  return (
    <NextImage
      alt={alt ?? "post_image"}
      loading="lazy"
      {...rest}
      width={1000}
      height={1000}
      className="mx-auto my-0 h-auto w-auto max-w-full rounded-sm shadow-md"
    />
  );
};

export default img;
