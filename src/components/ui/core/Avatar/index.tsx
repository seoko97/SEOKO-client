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

  return (
    <div onClick={onClick}>
      <Image
        width={width}
        height={height}
        src={src}
        quality={100}
        alt="avatar"
        className="rounded-[50%] object-cover"
      />
    </div>
  );
};

export default Avatar;
