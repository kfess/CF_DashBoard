import React, { memo } from "react";
import Stack from "@mui/material/Stack";
import type { HeatMapContent } from "@features/achievement/components/HeatMaps";
import { ratingColorInfo, ratingColor } from "@features/color/ratingColor";
import { heatmapColors } from "@features/color/heatmapColor";
import { useTheme } from "@mui/material";

const BLOCK_WIDTH = 10;
const WEEKS = 53;
const xOffset = BLOCK_WIDTH * 2;
const width = xOffset + BLOCK_WIDTH * WEEKS + BLOCK_WIDTH * 0.5;

type Props = {
  heatMapContent: HeatMapContent;
};

export const HeatMapColorSample: React.FC<Props> = memo(
  ({ heatMapContent }) => {
    const theme = useTheme();

    return (
      <Stack direction="row" justifyContent="flex-end" my={1}>
        <div>
          <svg width={800} viewBox={`0 0 ${width} 30`}>
            {(heatMapContent === "AllACSubmissions" ||
              heatMapContent === "AllSubmissions") &&
              heatmapColors.map((color, i) => (
                <g key={`colorSample-${i}`}>
                  <rect
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 1.2)}
                    y={0}
                    width={BLOCK_WIDTH * 0.85}
                    height={BLOCK_WIDTH * 0.85}
                    fill={color}
                    rx={2}
                    ry={2}
                  />
                  <text
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 1.2) - 5}
                    y={20}
                    fontSize={9}
                    fill={theme.palette.text.primary}
                  >
                    {color === "#c6e48b" && "less"}
                    {color === "#196127" && "more"}
                  </text>
                </g>
              ))}
            {heatMapContent === "MaxDifficulty" &&
              ratingColor.map((color, i) => (
                <g key={`colorSample-${i}`}>
                  <rect
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 1.2)}
                    y={0}
                    width={BLOCK_WIDTH * 0.85}
                    height={BLOCK_WIDTH * 0.85}
                    fill={ratingColorInfo[color].colorCode}
                    rx={2}
                    ry={2}
                  />
                  <text
                    x={WEEKS * BLOCK_WIDTH - i * (BLOCK_WIDTH * 1.2) - 5}
                    y={20}
                    fontSize={8}
                    fill={theme.palette.text.primary}
                  >
                    {ratingColorInfo[color].name === "DeepRed" && "Hard"}
                    {ratingColorInfo[color].name === "Gray" && "Easy"}
                  </text>
                </g>
              ))}
          </svg>
        </div>
      </Stack>
    );
  }
);
