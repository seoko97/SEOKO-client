type Props = (date: string) => string;

export const dateTimeParser: Props = (date) => {
  const currentDate = new Date();
  const inputDate = new Date(date);

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.ceil(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }

  if (hours >= 1) return `${hours}시간 전`;

  return `${minutes}분 전`;
};
