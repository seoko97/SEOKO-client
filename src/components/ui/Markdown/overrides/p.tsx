import { Children, isValidElement } from "react";

import type { JSX } from "react";

const p = ({ children, ...rest }: JSX.IntrinsicElements["p"]) => {
  const hasElement = Children.toArray(children).some(isValidElement);

  if (hasElement) {
    return <div {...rest}>{children}</div>;
  }

  return <p {...rest}>{children}</p>;
};

export default p;
