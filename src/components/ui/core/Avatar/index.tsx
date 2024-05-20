import React from "react";

import Image from "@components/ui/core/Image";

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
        alt="avatar"
        className="aspect-square rounded-full bg-slate-400 object-cover"
      />
    </div>
  );
};

export default Avatar;
