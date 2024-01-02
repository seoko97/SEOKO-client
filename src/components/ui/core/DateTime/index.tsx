import React from "react";

import { dateTimeParser } from "@utils/dateTimeParser";

interface IProps {
  date: string;
  className?: string;
}

const DateTime = ({ date, className }: IProps) => {
  return <span className={className}>{dateTimeParser(date)}</span>;
};

export default DateTime;
