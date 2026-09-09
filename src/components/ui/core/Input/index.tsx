import type { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;

const Input = ({ className, ref, ...props }: Props) => {
  return (
    <input
      className={`w-full rounded-sm border-[1px] border-primary bg-secondary px-4 py-2 text-primary transition-[border-color,background-color] focus:border-[theme(textColor.effect1)] focus:outline-none ${className}`}
      ref={ref}
      {...props}
    />
  );
};

export default Input;
