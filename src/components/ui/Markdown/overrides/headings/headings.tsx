import React from "react";

import { getChildrenText } from "@utils/getChildrenText";

interface IProps {
  children: React.ReactElement;
  tagname: string;
}

const Heading = ({ children, tagname }: IProps) => {
  const text = getChildrenText(children);
  const id = `${tagname}_${text.replace(/\s/g, "_").trim()}`;

  return React.createElement(tagname, { id }, children);
};

export default Heading;
