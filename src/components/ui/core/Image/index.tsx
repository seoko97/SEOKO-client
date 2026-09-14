import NextImage, { ImageProps } from "next/image";

const Image = ({ width, height, className = "", ...rest }: ImageProps) => {
  const isFill = rest.fill;

  return (
    <NextImage
      style={{ objectFit: "cover" }}
      className={isFill ? className : `relative h-auto max-w-full ${className}`}
      quality={80}
      width={isFill ? undefined : (width ?? 1000)}
      height={isFill ? undefined : (height ?? 1000)}
      {...rest}
    />
  );
};

export default Image;
