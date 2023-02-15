import React, { useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { RatingColor, RatingColorInfo } from "@features/color/ratingColor";
import type { Submission } from "@features/submission/submission";

type RenderActiveShapeProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: PieData;
  percent: number;
  value: number;
};

const renderActiveShape = (props: RenderActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill}>
        {payload.name}: {value}
      </text>
      <text x={cx} y={cy} dy={18} textAnchor="middle" fill={fill}>
        {` ${(percent * 100).toFixed(2)}%`}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <text x={cx} y={cy} dy={120} textAnchor="middle" fill={fill}></text>
    </g>
  );
};

type Props = {
  readonly colorInfo: RatingColorInfo[RatingColor];
  readonly problemsCount: number;
};
type PieData = {
  readonly name: string;
  readonly value: number;
  readonly color: string;
};

// need to change!
const solved = 1;
const unsolved = 1;
//

export const DifficultyPie: React.FC<Props> = (props: Props) => {
  const { colorInfo, problemsCount } = props;

  const pieData: PieData[] = [
    { name: "AC", value: solved, color: colorInfo.colorCode },
    { name: "Non-AC", value: unsolved, color: "#FFDD99" },
    {
      name: "No-Sub",
      value: problemsCount - unsolved - solved,
      color: "#59606A",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onPieEnter = useCallback(
    (_: number, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const onPieLeave = useCallback(() => {
    setActiveIndex(0);
  }, [setActiveIndex]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          dataKey="value"
          data={pieData}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          fill={colorInfo.colorCode}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
        >
          {pieData.map((d, index) => (
            <Cell key={`cell-${index}`} fill={d.color} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
