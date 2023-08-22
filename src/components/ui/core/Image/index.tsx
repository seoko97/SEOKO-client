import React from "react";

import NextImage, { ImageProps } from "next/image";

const Image = ({ width, height, ...rest }: ImageProps) => {
  return (
    <NextImage
      {...rest}
      quality={100}
      width={rest.fill ? undefined : width ?? 1000}
      height={rest.fill ? undefined : height ?? 1000}
    />
  );
};

// const Img = styled(NextImage)`
//   position: relative;

//   max-width: 100%;
//   height: auto;
//   aspect-ratio: 130 / 100;

//   border-radius: 1rem;

//   object-fit: cover;
//   border-radius: 10px;
// `;

export default Image;
