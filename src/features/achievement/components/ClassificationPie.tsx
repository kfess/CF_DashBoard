import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Submission } from "@features/submission/submission";
import {
  getACProblemSet,
  getNonACProblemSet,
} from "@features/achievement/processSubmission";
import type { Classification } from "@features/contests/contest";

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

  const fontSize = Math.min(outerRadius / 3, 14);

  return (
    <g>
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
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 4}
        fill={fill}
      />
      <text
        x={cx}
        y={cy}
        dy={-4}
        textAnchor="middle"
        fill={fill}
        fontSize={fontSize}
      >
        {payload.name}: {value}
      </text>
      <text
        x={cx}
        y={cy}
        dy={18}
        textAnchor="middle"
        fill={fill}
        fontSize={fontSize}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

type Props = {
  problemsCount: number;
  submissions: Submission[];
  classification: Classification;
};

type PieData = {
  readonly name: string;
  readonly value: number;
  readonly color: string;
};

export const ClassificationPie: React.FC<Props> = (props: Props) => {
  const { problemsCount, submissions, classification } = props;

  const ACProblemCount = getACProblemSet(submissions).size;
  const nonACProblemCount = getNonACProblemSet(submissions).size;

  const pieData: PieData[] = [
    { name: "AC", value: ACProblemCount, color: "#33CD34" },
    { name: "Non-AC", value: nonACProblemCount, color: "#FFDD99" },
    {
      name: "No-Sub",
      value: problemsCount - ACProblemCount - nonACProblemCount,
      color: "#59606A",
    },
  ];

  if (classification === "Div. 2") {
    console.log(submissions);
  }

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
    <Box sx={{ textAlign: "center" }}>
      <div>
        <ResponsiveContainer width="100%" aspect={1.5}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              dataKey="value"
              data={pieData}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              innerRadius="60%"
              outerRadius="80%"
            >
              {pieData.map((d, index) => (
                <Cell key={`cell-${index}`} fill={d.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <Typography variant="body1" color="text.secondary">
        {ACProblemCount} / {problemsCount}
      </Typography>
      <Typography variant="h6">{classification}</Typography>
    </Box>
  );
};
