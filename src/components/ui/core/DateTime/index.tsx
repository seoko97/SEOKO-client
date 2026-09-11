interface IProps {
  date: string;
  referenceTime: number;
  className?: string;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateTimeParser = (date: string, referenceTime: number) => {
  const inputDate = new Date(date);

  const timeDifference = Math.max(0, referenceTime - inputDate.getTime());
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.ceil(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return DATE_FORMATTER.format(inputDate);
  }

  if (hours >= 1) {
    return `${hours}시간 전`;
  }

  return `${minutes}분 전`;
};

const DateTime = ({ date, referenceTime, className }: IProps) => {
  const formatted = dateTimeParser(date, referenceTime);

  return <span className={className}>{formatted}</span>;
};

export default DateTime;
