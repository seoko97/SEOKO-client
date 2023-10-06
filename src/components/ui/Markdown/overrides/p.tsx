import React from "react";

const p = ({ children, ...rest }: JSX.IntrinsicElements["p"]) => {
  return <div {...rest}>{children}</div>;
};

export default p;
