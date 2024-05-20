import React from "react";

import { ImageProps } from "next/image";

import Image from "@components/ui/core/Image";

interface IProps extends ImageProps {
  size?: number;
  className?: string;
}

const SkillImage = ({ alt, size = 52, className = "", ...rest }: IProps) => {
  return (
    <div className="relative items-center justify-center rounded-md border-2 border-slate-300 bg-tertiary transition-[background-color,border] dark:border-slate-500">
      <Image
        {...rest}
        alt={alt}
        style={{ width: size, height: size, objectFit: "contain" }}
        priority
        width={size}
        height={size}
        className={`m-1 rounded-sm ${className}`}
      />
    </div>
  );
};

export default SkillImage;
