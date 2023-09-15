import React from "react";

const p = (props: JSX.IntrinsicElements["p"]) => {
  const { children, ...rest } = props;

  const child = (children as JSX.Element[])?.[0];

  if ((child && child.type === "p") || child.type === "div") {
    return <>{props.children}</>;
  }

  return <p {...rest}>{props.children}</p>;
};

export default p;
