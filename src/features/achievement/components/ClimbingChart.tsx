import * as dayjs from "dayjs";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  Area,
  AreaChart,
  XAxis,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  groupbyRatingColor,
  groupbyDate,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";
import type { RatingColor } from "@features/color/ratingColor";
import { ratingColor, ratingColorInfo } from "@features/color/ratingColor";

type CumulativeEffort = {
  date: number;
  count: number;
};
type ColoredCumulativeEffort = { date: number } & {
  [C in RatingColor]: number;
};

const displayColors = ["No Color", "Colored"] as const;
type DisplayColor = typeof displayColors[number];

type Props = { submissions: Submission[] };

export const ClimbingChart: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const [displayColor, setDisplayColor] = useState<DisplayColor>("No Color");
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions).sort(
    (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
  );

  const gDateSubmissions = groupbyDate(uniqueACSubmissions);

  // without rating color
  const noColoredCount: CumulativeEffort[] = gDateSubmissions
    .map((g) => {
      const [date, submissions] = g;
      return {
        date: dayjs(date).unix() * 1000,
        count: submissions.length,
      } as CumulativeEffort;
    })
    .reduce((arr, g, index) => {
      return [
        ...arr,
        {
          date: g.date,
          count: index > 0 ? arr[[...arr].length - 1].count + g.count : g.count,
        },
      ];
    }, [] as CumulativeEffort[]);

  // with rating color
  const coloredCount: ColoredCumulativeEffort[] = gDateSubmissions
    .map((g) => {
      const [date, submissions] = g;
      const gColorSubmissions = groupbyRatingColor(submissions);
      const colorCount = gColorSubmissions.reduce((obj, g) => {
        const [color, submissions] = g;
        return { ...obj, [color]: submissions.length };
      }, {} as { [C in RatingColor]: number });
      return { date: dayjs(date).unix() * 1000, ...colorCount };
    })
    .reduce((arr, g, index) => {
      if (index === 0) {
        return [...arr, { ...g }];
      } else {
        const cumColor = ratingColor.reduce((obj, color) => {
          return {
            ...obj,
            [color]: (g[color] ?? 0) + (arr[[...arr].length - 1][color] ?? 0),
          };
        }, {} as Omit<ColoredCumulativeEffort, "date">);
        return [
          ...arr,
          { date: g.date, ...cumColor } as ColoredCumulativeEffort,
        ];
      }
    }, [] as ColoredCumulativeEffort[]);

  return (
    <>
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <strong>Climbing Progress</strong>
      </Box>
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
        <AreaChart
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
              <Area
                key={color}
                dataKey={color}
                stackId="1"
                stroke={ratingColorInfo[color].colorCode}
                fill={ratingColorInfo[color].colorCode}
              />
            ))
          ) : (
            <Area
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
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
