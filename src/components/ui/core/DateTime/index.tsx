import React, { useState } from "react";

import { dateTimeParser } from "@utils/dateTimeParser";

interface IProps {
  date: string;
  className?: string;
}

const DateTime = ({ date, className }: IProps) => {
  const [formattedDate] = useState(dateTimeParser(date));

  if (!formattedDate) {
    return <span className="h-4 w-16 rounded-md bg-slate-300 dark:bg-slate-600" />;
  }

  return <span className={className}>{formattedDate}</span>;
};

export default DateTime;
