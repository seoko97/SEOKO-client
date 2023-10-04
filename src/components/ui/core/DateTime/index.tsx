import React, { useEffect, useState } from "react";

import { dateTimeParser } from "@utils/dateTimeParser";

interface IProps {
  date: string;
  className?: string;
}

const DateTime = ({ date, className }: IProps) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    const formatted = dateTimeParser(date);

    setFormattedDate(formatted);
  }, []);

  if (!formattedDate) {
    return <span className="h-4 w-16 rounded-md bg-slate-300 dark:bg-slate-600" />;
  }

  return <span className={className}>{formattedDate}</span>;
};

export default DateTime;
