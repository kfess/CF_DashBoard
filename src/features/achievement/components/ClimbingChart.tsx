import * as dayjs from "dayjs";
import React, { useState } from "react";
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
} from "@features/achievement/processSubmission";
import type { RatingColor } from "@features/color/ratingColor";
import { ratingColor, ratingColorInfo } from "@features/color/ratingColor";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";

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

  const ACSubmissions = submissions
    .filter(isACSubmission)
    .sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);
  const gDateSubmissions = groupbyDate(ACSubmissions);

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
        const cum = ratingColor.reduce((obj, color) => {
          return {
            ...obj,
            [color]: (g[color] ?? 0) + (arr[[...arr].length - 1][color] ?? 0),
          };
        }, {});
        return [...arr, { date: g.date, ...cum } as ColoredCumulativeEffort];
      }
    }, [] as ColoredCumulativeEffort[]);

  return (
    <>
      <DropDownMenuButton
        title="color"
        items={displayColors}
        selectedItem={displayColor}
        setSelectedItem={setDisplayColor}
      />
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
