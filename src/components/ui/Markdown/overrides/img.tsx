/* eslint-disable @next/next/no-img-element */
import React from "react";

import { ImageProps } from "next/image";

import NextImage from "@components/ui/core/Image";

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
    <>
      <NextImage
        priority
        alt={alt ?? "post_image"}
        {...rest}
        width={1000}
        height={1000}
        className="mx-auto my-0 h-auto w-auto max-w-full rounded-md shadow-sm sm:w-full"
      />
      {alt && <p className="mt-2 text-center text-sm text-gray-400">{alt}</p>}
    </>
  );
};

export default img;
