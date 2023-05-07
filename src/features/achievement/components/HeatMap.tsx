import dayjs from "dayjs";
import React from "react";

const COLOR_GREY = "#ebedf0";
const DAY_NAMES_SHORT = ["Mon", "Wed", "Fri"] as const;

const BLOCK_WIDTH = 10;
const WEEKDAY = 7;
const WEEKS = 53;

type Props = {
  tableData: { date: string; value?: number }[];
};

export const HeatMap: React.FC<Props> = (props: Props) => {
  const { tableData } = props;

  const xOffset = BLOCK_WIDTH * 2;
  const yOffset = BLOCK_WIDTH;
  const width = xOffset + BLOCK_WIDTH * WEEKS + BLOCK_WIDTH * 0.5;
  const height = yOffset + BLOCK_WIDTH * WEEKDAY;

  return (
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
        {tableData.map(({ date }, i) => {
          const week = Math.floor(i / WEEKDAY);
          const day = i % WEEKS;
          const d = dayjs(date);
          if (day === 0 && d.date() <= 7) {
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
        {tableData.map(({ date, value }, i) => {
          if (dayjs().isAfter(date)) return null;
          const color = value === undefined ? COLOR_GREY : "green";
          const week = Math.floor(i / WEEKDAY);
          const day = i % WEEKDAY;
          return (
            <rect
              key={date}
              id={`rect-${date}`}
              x={xOffset + week * BLOCK_WIDTH}
              y={yOffset + day * BLOCK_WIDTH}
              width={BLOCK_WIDTH * 0.95}
              height={BLOCK_WIDTH * 0.95}
              fill={color}
            />
          );
        })}
      </svg>
    </div>
  );
};
