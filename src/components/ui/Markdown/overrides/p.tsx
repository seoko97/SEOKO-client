import React from "react";

import type { JSX } from "react";

const p = ({ children, ...rest }: JSX.IntrinsicElements["p"]) => {
  return <div {...rest}>{children}</div>;
};

export default p;
