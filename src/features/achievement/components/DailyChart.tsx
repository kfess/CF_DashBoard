import * as dayjs from "dayjs";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  groupbyRatingColor,
  groupbyDate,
} from "@features/achievement/processSubmission";
import type { RatingColor } from "@features/color/ratingColor";
import { ratingColor, ratingColorInfo } from "@features/color/ratingColor";

type DailyEffort = {
  date: number;
  count: number;
};
type ColoredDailyEffort = { date: number } & { [C in RatingColor]: number };

const displayColors = ["No Color", "Colored"] as const;
type DisplayColor = typeof displayColors[number];

type Props = { submissions: Submission[] };

export const DailyChart: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const [displayColor, setDisplayColor] = useState<DisplayColor>("No Color");

  const ACSubmissions = submissions
    .filter(isACSubmission)
    .sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);

  const gDateSubmissions = groupbyDate(ACSubmissions);

  // without rating color
  const noColoredCount: DailyEffort[] = gDateSubmissions.map((g) => {
    const [date, submissions] = g;
    return { date: dayjs(date).unix() * 1000, count: submissions.length };
  });

  // with rating color
  const coloredCount: ColoredDailyEffort[] = gDateSubmissions.map((g) => {
    const [date, submissions] = g;
    const gColorSubmissions = groupbyRatingColor(submissions);
    const colorCount = gColorSubmissions.reduce((obj, g) => {
      const [color, submissions] = g;
      return { ...obj, [color]: submissions.length };
    }, {} as { [C in RatingColor]: number });
    return { date: dayjs(date).unix() * 1000, ...colorCount };
  });

  return (
    <>
      <Box sx={{ display: "flex", p: 1 }}>
        <ButtonGroup>
          <Button
            onClick={() => {
              setDisplayColor("No Color");
            }}
            variant="contained"
            color="inherit"
            size="small"
          >
            Simple
          </Button>
          <Button
            onClick={() => {
              setDisplayColor("Colored");
            }}
            variant="contained"
            color="inherit"
            size="small"
          >
            Color
          </Button>
        </ButtonGroup>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={displayColor === "Colored" ? coloredCount : noColoredCount}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          {displayColor === "Colored" ? (
            ratingColor.map((color) => (
              <Bar
                key={color}
                dataKey={color}
                stackId="1"
                stroke={ratingColorInfo[color].colorCode}
                fill={ratingColorInfo[color].colorCode}
              />
            ))
          ) : (
            <Bar
              dataKey="count"
              type="linear"
              stroke="#8884d8"
              fillOpacity={1}
            />
          )}
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="date"
            type="number"
            domain={["dataMin", "dataMax"]}
            tick={{ fontSize: 12 }}
            scale="auto"
            tickFormatter={(date: number): string =>
              dayjs(date).format("YYYY-MM-DD")
            }
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            labelFormatter={(date: number) => dayjs(date).format("YYYY-MM-DD")}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
