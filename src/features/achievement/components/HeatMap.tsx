import dayjs from "dayjs";
import React from "react";
import Typography from "@mui/material/Typography";
import { HeatMapContent } from "@features/achievement/components/HeatMaps";
import {
  getColorCodeFromRating,
  ratingColorInfo,
  ratingColor,
} from "@features/color/ratingColor";
import { pluralize } from "@helpers/format";

const COLOR_GREY = "#ebedf0";
const valueToColor = (value: number | undefined) => {
  if (value === undefined) {
    return COLOR_GREY;
  } else if (value === 1) {
    return "#9be9a8"; // Light green
  } else if (value < 3) {
    return "#40c463"; // Green
  } else if (value < 5) {
    return "#30a14e"; // Dark green
  } else {
    return "#216e39"; // Very dark green
  }
};

const maxDifficultyToColor = (value: number | undefined) => {
  return value === undefined ? COLOR_GREY : getColorCodeFromRating(value);
};

// Define color samples for the legend
const colorSamples = [
  { color: "#9be9a8", value: "less" },
  { color: "#40c463", value: "" },
  { color: "#30a14e", value: "" },
  { color: "#216e39", value: "more" },
];

const DAY_NAMES_SHORT = ["Mon", "Wed", "Fri"] as const;

const BLOCK_WIDTH = 10;
const WEEKDAY = 7;
const WEEKS = 53;

const xOffset = BLOCK_WIDTH * 2;
const yOffset = BLOCK_WIDTH;
const width = xOffset + BLOCK_WIDTH * WEEKS + BLOCK_WIDTH * 0.5;
const height = yOffset + BLOCK_WIDTH * WEEKDAY;

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
  return (
    <>
      <Typography
        variant="body1"
        color="text.secondary"
        css={{ marginBottom: "1rem" }}
      >
        {heatMapContent === "AllSubmissions" ? (
          <div>
            {heatMapData
              .reduce((prev, curr) => (prev += curr.value ?? 0), 0)
              .toLocaleString()}{" "}
            {pluralize(heatMapData.length, "Submission")}
          </div>
        ) : (
          <div>
            {heatMapData
              .reduce((prev, curr) => (prev += curr.value ?? 0), 0)
              .toLocaleString()}{" "}
            {pluralize(heatMapData.length, "AC Submission")}
          </div>
        )}
      </Typography>
      <div css={{ width: "100%" }}>
        <svg viewBox={`0 0 ${width} ${height}`} css={{ width: "100%" }}>
          {DAY_NAMES_SHORT.map((dayName, i) => (
            <text
              key={dayName}
              x={0}
              y={yOffset * 0.7 + (2 * i + 2) * BLOCK_WIDTH}
              fill="gray"
              fontSize={7}
            >
              {dayName}
            </text>
          ))}
          {heatMapData.map(({ date }, i) => {
            const week = Math.floor(i / WEEKDAY);
            const d = dayjs(date);
            if (d.date() === 1) {
              return (
                <text
                  key={`text-${date}`}
                  x={xOffset + week * BLOCK_WIDTH}
                  y={yOffset * 0.7}
                  fill="gray"
                  fontSize={7}
                >
                  {d.format("MMM")}
                </text>
              );
            }
            return null;
          })}
          {heatMapData.map(({ date, value, maxDifficulty }, i) => {
            const color =
              heatMapContent === "MaxDifficulty"
                ? maxDifficultyToColor(maxDifficulty)
                : valueToColor(value);
            const week = Math.floor(i / WEEKDAY);
            const day = i % WEEKDAY;
            return (
              <rect
                key={date}
                id={`rect-${date}`}
                x={xOffset + week * BLOCK_WIDTH}
                y={yOffset + day * BLOCK_WIDTH}
                width={BLOCK_WIDTH * 0.9}
                height={BLOCK_WIDTH * 0.9}
                fill={color}
              >
                <title>{`Date: ${date}, Value: ${value ?? 0}, MaxDifficulty: ${
                  maxDifficulty ?? 0
                }`}</title>
              </rect>
            );
          })}
        </svg>
        <div
          css={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "1rem",
          }}
        >
          <svg viewBox={`0 0 ${width} 50`} css={{ width: "100%" }}>
            {(heatMapContent === "AllACSubmissions" || // color sample
              heatMapContent === "AllSubmissions") &&
              colorSamples.map(({ color, value }, i) => (
                <g key={`colorSample-${i}`}>
                  <rect
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 2.5)} // Adjusted x position
                    y={0} // Adjusted y position
                    width={BLOCK_WIDTH * 0.9}
                    height={BLOCK_WIDTH * 0.9}
                    fill={color}
                  />
                  <text
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 2.5) - 5} // Adjusted x position
                    y={25} // Adjusted y position
                    fontSize={12}
                  >
                    {value}
                  </text>
                </g>
              ))}
            {heatMapContent === "MaxDifficulty" &&
              ratingColor.map((color, i) => (
                <g key={`colorSample-${i}`}>
                  <rect
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 1.8)} // Adjusted x position
                    y={0} // Adjusted y position
                    width={BLOCK_WIDTH * 0.9}
                    height={BLOCK_WIDTH * 0.9}
                    fill={ratingColorInfo[color].colorCode}
                  />
                  <text
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 1.8) - 5} // Adjusted x position
                    y={25} // Adjusted y position
                    fontSize={12}
                  >
                    {ratingColorInfo[color].name === "DeepRed" && "Hard"}
                    {ratingColorInfo[color].name === "Gray" && "Easy"}
                  </text>
                </g>
              ))}
          </svg>
        </div>
      </div>
    </>
  );
};
