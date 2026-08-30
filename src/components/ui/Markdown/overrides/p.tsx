import { Children, isValidElement } from "react";

import type { JSX } from "react";

const p = ({ children, className, ...rest }: JSX.IntrinsicElements["p"]) => {
  const hasElement = Children.toArray(children).some(isValidElement);
  const paragraphClassName = `markdown-paragraph my-[18px] md:my-4 ${className ?? ""}`;

  if (hasElement) {
    return (
      <div {...rest} className={paragraphClassName}>
        {children}
      </div>
    );
  }

  return (
    <p {...rest} className={paragraphClassName}>
      {children}
    </p>
  );
};

export default p;
