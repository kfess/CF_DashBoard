import dayjs from "dayjs";
import { formatUnixTime, isLastYear, isLastMonth } from "@helpers/date";

describe("date-utils", () => {
  describe("formatUnixTime", () => {
    it("should return the formatted date string without time when simple flag is set to true", () => {
      const unixTime = 1633046400; // 2021-10-01
      const result = formatUnixTime(unixTime, true);

      expect(result).toEqual("2021-10-01");
    });

    it("should return the formatted date string with time when simple flag is set to false", () => {
      const unixTime = 1633046400; // 2021-10-01 09:00:00
      const result = formatUnixTime(unixTime, false);

      expect(result).toEqual("2021-10-01 09:00:00");
    });
  });

  describe("isLastYear", () => {
    it("should return true if the given unix time is from the previous year", () => {
      const lastYearUnixTime = dayjs().subtract(1, "year").unix();
      const result = isLastYear(lastYearUnixTime);

      expect(result).toBe(true);
    });

    it("should return false if the given unix time is not from the previous year", () => {
      const notLastYearUnixTime = dayjs().subtract(2, "year").unix();
      const result = isLastYear(notLastYearUnixTime);

      expect(result).toBe(false);
    });
  });

  describe("isLastMonth", () => {
    it("should return true if the given unix time is from the previous month", () => {
      const lastMonthUnixTime = dayjs().subtract(1, "month").unix();
      const result = isLastMonth(lastMonthUnixTime);

      expect(result).toBe(true);
    });

    it("should return false if the given unix time is not from the previous month", () => {
      const notLastMonthUnixTime = dayjs().subtract(2, "month").unix();
      const result = isLastMonth(notLastMonthUnixTime);

      expect(result).toBe(false);
    });
  });
});
