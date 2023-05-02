import dayjs from "dayjs";
import { utcISOStringToLocal } from "@helpers/date";
import type {
  CustomContest,
  CreatedContestType,
} from "@features/custom_contests/customContest";

export const judgeContestType = (
  contest: CustomContest
): CreatedContestType => {
  if (dayjs().isAfter(utcISOStringToLocal(contest.endDate))) {
    return "Finished";
  } else if (
    dayjs().isAfter(utcISOStringToLocal(contest.startDate)) &&
    dayjs().isBefore(utcISOStringToLocal(contest.endDate))
  ) {
    return "Running";
  } else {
    return "Upcoming";
  }
};
