import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

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

// ローカルの時間を UTC ISOString に変換する関数
export const localToUtcISOString = (localDateTime: Date) => {
  return dayjs(localDateTime).utc().toISOString();
};

// UTC ISOString をローカルの時間に変換する関数
export const utcISOStringToLocal = (utcISOString: string) => {
  return dayjs.utc(utcISOString).local().format("YYYY-MM-DD HH:mm");
};

export const secondsToHms = (d: number) => {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h.toString().padStart(2, "0") + ":" : "0:";
  const mDisplay = m.toString().padStart(2, "0") + ":";
  const sDisplay = s.toString().padStart(2, "0");
  return hDisplay + mDisplay + sDisplay;
};

// 10分単位で丸める
// for custom contest
export const getDefaultStartDate = () => {
  const now = dayjs();
  const nextInterval = Math.ceil((now.minute() + 1) / 30) * 30;
  const startDate = now.minute(nextInterval).second(0).millisecond(0);
  return startDate.toISOString();
};

export const getDefaultEndDate = () => {
  const now = dayjs();
  const nextInterval = Math.ceil((now.minute() + 1) / 30) * 30;
  const startDate = now.minute(nextInterval).second(0).millisecond(0);
  const endDate = startDate.add(2, "hour");
  return endDate.toISOString();
};
