import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Count } from "@features/achievement/components/LanguageACCount";
import { languageColors } from "@features/color/languageColor";

type RenderActiveShapeProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: Count;
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
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const fontSize = Math.min(outerRadius / 2, 16);

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize={fontSize}
      >
        {payload.language}
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={fontSize}
      >{`${value} AC`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={fontSize}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

type Props = {
  languageCounts: Count[];
};

export const LanguageACCountPie: React.FC<Props> = ({ languageCounts }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Box>
      <IconButton id="language-button" onClick={handleClickOpen}>
        <OpenInNewIcon fontSize="small" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="language-modal"
        aria-describedby="language-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            border: "1px solid #000",
            boxShadow: "24px",
            p: 4,
            width: {
              xs: "80%", // extra small devices and up
              md: "80%", // medium devices and up
            },
            height: {
              xs: "50%", // extra small devices and up
              md: "80%", // medium devices and up
            },
            overflow: "auto",
          }}
        >
          <div>
            <ResponsiveContainer aspect={1.5}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  dataKey="count"
                  nameKey="language"
                  data={languageCounts}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  fill="#8884d8"
                  innerRadius="60%"
                  outerRadius="80%"
                >
                  {languageCounts.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.language}`}
                      fill={languageColors[index % languageColors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};
