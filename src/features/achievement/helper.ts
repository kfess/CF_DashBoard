import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

const WEEKDAY = 7;
const WEEKS = 53;

type TableData = { date: string; value?: number };

const getToday = () => dayjs();
const getNextSunday = (t: dayjs.Dayjs) => {
  const date = t.date();
  const weekday = t.weekday();
  return t.date(date + 7 - weekday);
};

export const createTableData = () => {
  const today = getToday();
  const nextSunday = getNextSunday(today);
  const startDate = nextSunday.date(nextSunday.date() - WEEKS * WEEKDAY);
  const tableData: TableData[] = [];
  for (let i = 0; i < WEEKDAY * WEEKS; i++) {
    tableData.push({ date: "2023-01-11", value: 0 });
  }

  return tableData;
};
