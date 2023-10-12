import React from "react";

import { removeSpecialCharacters } from "@utils/getToc";
import { getChildrenText } from "@utils/getChildrenText";

interface IProps {
  children: React.ReactElement;
  tagname: string;
}

const Heading = ({ children, tagname }: IProps) => {
  const text = getChildrenText(children);
  const id = removeSpecialCharacters(text);

  return React.createElement(tagname, { id }, children);
};

export default Heading;
