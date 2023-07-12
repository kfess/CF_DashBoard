import dayjs from "dayjs";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
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
import { CircularProgress } from "@features/ui/component/CircularProgress";

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

  if (!submissions) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box
        sx={{
          m: 1,
          p: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Daily Progress
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <ToggleButtonGroup
          value={displayColor}
          exclusive
          onChange={(_, value) => value && setDisplayColor(value)}
          size="small"
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              borderColor: "grey.500",
            },
          }}
        >
          <ToggleButton value="No Color" disableRipple>
            Simple
          </ToggleButton>
          <ToggleButton value="Colored" disableRipple>
            Color
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <ResponsiveContainer width="95%" aspect={2.5}>
        <BarChart
          data={displayColor === "Colored" ? coloredCount : noColoredCount}
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
