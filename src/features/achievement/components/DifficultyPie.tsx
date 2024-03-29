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
import type { RatingColor, RatingColorInfo } from "@features/color/ratingColor";
import type { Submission } from "@features/submission/submission";
import {
  getACProblemSet,
  getNonACProblemSet,
} from "@features/achievement/processSubmission";
import { useTheme } from "@mui/material";

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
        dy={0}
        textAnchor="middle"
        fill={fill}
        fontSize={fontSize}
      >
        {payload.name}: {value}
      </text>
      <text
        x={cx}
        y={cy}
        dy={17}
        textAnchor="middle"
        fill={fill}
        fontSize={fontSize}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
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

export const DifficultyPie: React.FC<Props> = ({
  colorInfo,
  problemsCount,
  submissions,
}) => {
  const theme = useTheme();

  const ACProblemCount = getACProblemSet(submissions).size;
  const nonACProblemCount = getNonACProblemSet(submissions).size;

  const pieData: PieData[] = [
    {
      name: "AC",
      value: ACProblemCount,
      color:
        theme.palette.mode === "light"
          ? colorInfo.colorCode
          : colorInfo.darkColorCode,
    },
    { name: "Non-AC", value: nonACProblemCount, color: "#FFC653" },
    {
      name: "No-Sub",
      value: problemsCount - ACProblemCount - nonACProblemCount,
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
              fill={colorInfo.colorCode}
              innerRadius="60%"
              outerRadius="80%"
            >
              {pieData.map((d) => (
                <Cell key={`cell-${d.name}`} fill={d.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Typography variant="body1" color="text.secondary">
        {ACProblemCount} / {problemsCount}
      </Typography>
      <Typography variant="h6">
        {colorInfo.lowerBound === -1 && colorInfo.upperBound === -1
          ? "No Category Available"
          : colorInfo.lowerBound + " ~ " + colorInfo.upperBound}
      </Typography>
    </Box>
  );
};
