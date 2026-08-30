/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import { ImageProps } from "next/image";

import NextImage from "@components/ui/core/Image";

const IMAGE_BASE_URL = "image.toast.com";

const isConfiguredImageUrl = (src: string) => {
  try {
    return new URL(src).hostname === IMAGE_BASE_URL;
  } catch {
    return false;
  }
};

const img = (props: ImageProps) => {
  const { alt, className, src, ...rest } = props;

  if (!src) return;

  const hasConfigured = typeof src === "string" && isConfiguredImageUrl(src);

  if (!hasConfigured) {
    return (
      <img
        {...(rest as JSX.IntrinsicElements["img"])}
        alt={alt ?? "post_image"}
        src={src as string}
        className={`my-6 block h-auto max-w-full ${className ?? ""}`}
      />
    );
  }

  return (
    <>
      <NextImage
        loading="lazy"
        alt={alt ?? "post_image"}
        src={src}
        {...rest}
        className={`mx-auto my-6 h-auto w-auto max-w-full rounded-md shadow-sm sm:w-full ${className ?? ""}`}
      />
      {alt && <p className="mt-2 text-center text-sm text-gray-400">{alt}</p>}
    </>
  );
};

export default img;
