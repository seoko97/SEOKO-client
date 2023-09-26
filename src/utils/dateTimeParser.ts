type Props = (date: string) => string;

export const dateTimeParser: Props = (date) => {
  const diff = Math.ceil((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60));

  const dateTimeFormat = new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
    new Date(date),
  );

  const relativeTimeFormat = new Intl.RelativeTimeFormat("ko", { numeric: "auto" }).format(
    diff * -1,
    "hour",
  );

  return diff >= 24 ? dateTimeFormat : relativeTimeFormat;
};
