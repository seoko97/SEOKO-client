import React, { forwardRef } from "react";

type Props = React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      className="w-full rounded-sm border-[1px] border-primary bg-secondary px-4 py-2 text-primary transition-[border-color,background-color] focus:border-[theme(textColor.effect1)] focus:bg-primary focus:outline-none"
      ref={ref}
      {...props}
    />
  );
});

export default Input;
