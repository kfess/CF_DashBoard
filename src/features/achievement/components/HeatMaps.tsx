import dayjs from "dayjs";
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Submission } from "@features/submission/submission";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { HeatMap, HeatMapData } from "@features/achievement/components/HeatMap";
import { TabItem, Tabs } from "@features/ui/component/Tabs";
import { List } from "@features/ui/component/List";

type Props = {
  submissions: Submission[];
};

type YearMode = "YearStartToEnd" | "CurrentDayToPastOneYear";
type Year = number; // 2023, 2022, ...
const heatmapContents = [
  "AllSubmissions",
  "AllACSubmissions",
  "MaxDifficulty",
] as const;
export type HeatMapContent = typeof heatmapContents[number];

const makeHeatMapData = (
  submissions: Submission[],
  yearMode: YearMode,
  year: Year,
  heatMapContent: HeatMapContent
): HeatMapData[] => {
  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs;

  if (yearMode === "YearStartToEnd") {
    startDate = dayjs(`${year}-01-01`);
    endDate = dayjs(`${year}-12-31`);
  } else {
    endDate = dayjs();
    startDate = endDate.subtract(1, "year");
  }
  // HeatMap must starts from Sunday, so if startDate is not Sunday, move it to next Sunday
  startDate = startDate.day() !== 0 ? startDate.day(7) : startDate;

  const daysDiff = endDate.diff(startDate, "day");

  // Group submissions by date
  const submissionsByDate: { [date: string]: Submission[] } = {};
  for (const sub of submissions) {
    const date = dayjs.unix(sub.creationTimeSeconds).format("YYYY-MM-DD");
    if (!submissionsByDate[date]) {
      submissionsByDate[date] = [];
    }
    submissionsByDate[date].push(sub);
  }

  return Array.from({ length: daysDiff + 1 }, (_, index) => {
    const currentDate = startDate.add(index, "day").format("YYYY-MM-DD");
    const submissionsOnDate = submissionsByDate[currentDate] ?? [];

    let value: number | undefined;
    let maxDifficulty: number | undefined;

    switch (heatMapContent) {
      case "AllSubmissions":
        value = submissionsOnDate.length;
        maxDifficulty = Math.max(
          ...submissionsOnDate.map((sub) => sub.problem.rating ?? 0),
          0
        );
        break;
      case "AllACSubmissions":
        const acSubmissions = submissionsOnDate.filter(
          (sub) => sub.verdict === "OK"
        );
        value = acSubmissions.length;
        maxDifficulty = Math.max(
          ...acSubmissions.map((sub) => sub.problem.rating ?? 0),
          0
        );
        break;
      case "MaxDifficulty":
        maxDifficulty = Math.max(
          ...submissionsOnDate.map((sub) => sub.problem.rating ?? 0),
          0
        );
        value = maxDifficulty > 0 ? 1 : 0;
        break;
    }

    return {
      date: currentDate,
      value: value > 0 ? value : undefined,
      maxDifficulty: maxDifficulty > 0 ? maxDifficulty : undefined,
    };
  });
};

export const HeatMaps: React.FC<Props> = ({ submissions }) => {
  const userId = useQueryParams(QueryParamKeys.USERID);
  const { data: userInfo, isLoading } = useFetchUserInfo({ userId });

  if (isLoading || !userInfo) {
    return <CircularProgress />;
  }

  const regYear = dayjs.unix(userInfo.registrationTimeSeconds).year();
  const currYear = dayjs().year();
  const years = Array.from(
    { length: currYear - regYear + 1 },
    (_, i) => currYear - i
  );

  const [yearMode, setYearMode] = useState<YearMode>("CurrentDayToPastOneYear");
  const [selectedYear, setSelectedYear] = useState<Year>(currYear);

  const allSubsHeatMapData = useMemo(
    () =>
      makeHeatMapData(submissions, yearMode, selectedYear, "AllSubmissions"),
    [submissions, yearMode, selectedYear]
  );

  const allACSubsHeatMapData = useMemo(
    () =>
      makeHeatMapData(submissions, yearMode, selectedYear, "AllACSubmissions"),
    [submissions, yearMode, selectedYear]
  );

  const maxDifficultyHeatMapData = useMemo(
    () => makeHeatMapData(submissions, yearMode, selectedYear, "MaxDifficulty"),
    [submissions, yearMode, selectedYear]
  );

  const tabItems: TabItem[] = [
    {
      label: "All Submission",
      children: (
        <HeatMap
          heatMapData={allSubsHeatMapData}
          heatMapContent="AllSubmissions"
        />
      ),
      disabled: false,
    },
    {
      label: "All AC Submission",
      children: (
        <HeatMap
          heatMapData={allACSubsHeatMapData}
          heatMapContent="AllACSubmissions"
        />
      ),
      disabled: false,
    },
    {
      label: "Max Difficulty",
      children: (
        <HeatMap
          heatMapData={maxDifficultyHeatMapData}
          heatMapContent="MaxDifficulty"
        />
      ),
      disabled: false,
    },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Heat Map
      </Typography>
      <List
        items={years.map((year) => ({
          text: year.toString(),
          onClick: () => {
            setSelectedYear(year);
            setYearMode("YearStartToEnd");
          },
          selected: year === selectedYear,
        }))}
      />
      <Tabs tabItems={tabItems} />
    </Box>
  );
};
