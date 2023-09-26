/* eslint-disable @next/next/no-img-element */
import React from "react";

import NextImage, { ImageProps } from "next/image";

const IMAGE_BASE_URL = "image.toast.com";

const img = (props: ImageProps) => {
  const { alt, ...rest } = props;

  const isInclude = rest.src.toString().includes(IMAGE_BASE_URL);

  if (!isInclude) {
    return (
      <img
        {...(rest as JSX.IntrinsicElements["img"])}
        alt={alt ?? "post_image"}
        className="inline-block"
      />
    );
  }

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
