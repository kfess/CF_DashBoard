import dayjs from "dayjs";

export const formatUnixTime = (unitTime: number, simple: boolean = false) =>
  simple
    ? dayjs.unix(unitTime).format("YYYY-MM-DD")
    : dayjs.unix(unitTime).format("YYYY-MM-DD HH:mm:ss");

export const isLastYear = (unitTime: number) =>
  dayjs().year() - dayjs.unix(unitTime).year() === 1;

export const isLastMonth = (unixTime: number) => {
  const thisYear = dayjs().year();
  const thisMonth = dayjs().month();

  if (thisMonth === 0) {
    return (
      thisYear - dayjs.unix(unixTime).year() === 1 &&
      dayjs.unix(unixTime).month() === 11
    );
  } else {
    return (
      thisYear === dayjs.unix(unixTime).year() &&
      thisMonth - dayjs.unix(unixTime).month() === 1
    );
  }
};
