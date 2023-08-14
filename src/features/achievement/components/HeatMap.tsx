import dayjs from "dayjs";
import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import type { HeatMapContent } from "@features/achievement/components/HeatMaps";
import { pluralize } from "@helpers/format";
import { HeatMapColorSample } from "./HeatMapColorSample";
import {
  valueToColor,
  maxDifficultyToColor,
} from "@features/color/heatmapColor";

// constants for heatmap
const DAY_NAMES_SHORT = ["Mon", "Wed", "Fri"] as const;
const BLOCK_WIDTH = 10;
const WEEKDAY = 7;
const WEEKS = 53;
const xOffset = BLOCK_WIDTH * 2;
const yOffset = BLOCK_WIDTH;
const width = xOffset + BLOCK_WIDTH * WEEKS + BLOCK_WIDTH * 0.5;
const height = yOffset + BLOCK_WIDTH * WEEKDAY;

const getFillColor = (
  content: HeatMapContent,
  value?: number,
  maxDifficulty?: number
) => {
  return content === "MaxDifficulty"
    ? maxDifficultyToColor(maxDifficulty)
    : valueToColor(value);
};

export type HeatMapData = {
  readonly date: string;
  readonly value?: number;
  readonly maxDifficulty?: number;
};

type Props = {
  heatMapData: HeatMapData[];
  heatMapContent: HeatMapContent;
};

export const HeatMap: React.FC<Props> = ({ heatMapData, heatMapContent }) => {
  const totalSubmissions = useMemo(
    () => heatMapData.reduce((prev, curr) => (prev += curr.value ?? 0), 0),
    [heatMapData]
  );

  return (
    <>
      <Typography variant="h6" color="text.secondary" my={1}>
        {totalSubmissions} {pluralize(totalSubmissions, "submission")}
      </Typography>
      <div css={{ width: "100%", overflowX: "scroll" }}>
        <div>
          <svg width={800} viewBox={`0 0 ${width} ${height}`}>
            {DAY_NAMES_SHORT.map((dayName, i) => (
              <text
                key={dayName}
                x={0}
                y={yOffset * 0.7 + (2 * i + 2) * BLOCK_WIDTH}
                fill="gray"
                fontSize={8}
              >
                {dayName}
              </text>
            ))}
            {heatMapData.map(({ date, value, maxDifficulty }, i) => {
              const week = Math.floor(i / WEEKDAY);
              const day = i % WEEKDAY;
              const d = dayjs(date);
              const color = getFillColor(heatMapContent, value, maxDifficulty);

              return (
                <React.Fragment key={date}>
                  {d.date() === 1 && (
                    <text
                      key={`text-${date}`}
                      x={xOffset + week * BLOCK_WIDTH}
                      y={yOffset * 0.7}
                      fill="gray"
                      fontSize={8}
                    >
                      {d.format("MMM")}
                    </text>
                  )}
                  <Tooltip
                    title={`Date: ${date}, ${
                      value || 0
                    } submissions, maxDifficulty: ${maxDifficulty || "-"}`}
                    arrow
                    enterTouchDelay={0}
                  >
                    <rect
                      id={`rect-${date}`}
                      x={xOffset + week * BLOCK_WIDTH}
                      y={yOffset + day * BLOCK_WIDTH}
                      width={BLOCK_WIDTH * 0.9}
                      height={BLOCK_WIDTH * 0.9}
                      fill={color}
                      rx={2}
                      ry={2}
                    />
                  </Tooltip>
                </React.Fragment>
              );
            })}
          </svg>
        </div>
      </div>
      <HeatMapColorSample heatMapContent={heatMapContent} />
    </>
  );
};
