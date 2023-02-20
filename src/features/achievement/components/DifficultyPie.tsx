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
import {
  getACProblemSet,
  getNonACProblemSet,
} from "@features/achievement/processSubmission";

type RenderActiveShapeProps = {
  cx: number;
  cy: number;
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
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

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
  readonly submissions: Submission[];
};

type PieData = {
  readonly name: string;
  readonly value: number;
  readonly color: string;
};

export const DifficultyPie: React.FC<Props> = (props: Props) => {
  const { colorInfo, problemsCount, submissions } = props;

  const ACProblemCount = getACProblemSet(submissions).size;
  const nonACProblemCount = getNonACProblemSet(submissions).size;

  const pieData: PieData[] = [
    { name: "AC", value: ACProblemCount, color: colorInfo.colorCode },
    { name: "Non-AC", value: nonACProblemCount, color: "#FFDD99" },
    {
      name: "No-Sub",
      // value: problemsCount - ACProblemCount - nonACProblemCount,
      value: 2000 - ACProblemCount - nonACProblemCount,
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
