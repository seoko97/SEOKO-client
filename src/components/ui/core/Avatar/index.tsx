import React from "react";

import Image from "next/image";

interface IProps {
  src?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Avatar: React.FC<IProps> = (props) => {
  const { src = "/main.jpg", width = 30, height = 30, onClick } = props;

  const containerProps = {
    onClick,
    className: "flex overflow-hidden rounded-full cursor-pointer",
  };

  const imageProps = {
    width,
    height,
    src,
    quality: 100,
    alt: "avatar",
    className: "object-cover",
  };

  return (
    <div {...containerProps}>
      <Image {...imageProps} />
    </div>
  );
};

export default Avatar;
