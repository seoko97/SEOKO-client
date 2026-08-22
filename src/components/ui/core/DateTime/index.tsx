import { dateTimeParser } from "@utils/dateTimeParser";

interface IProps {
  date: string;
  className?: string;
}

const DateTime = ({ date, className }: IProps) => {
  const formatted = dateTimeParser(date);

  return <span className={className}>{formatted}</span>;
};

export default DateTime;
