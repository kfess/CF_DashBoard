import { getColorCodeFromRating } from "@features/color/ratingColor";

export const heatmapColors = [
  "#ebedf0", // アクティビティのない日の色
  "#c6e48b", // 最も薄い緑
  "#7bc96f", // 中間の緑
  "#239a3b", // 暗い緑
  "#196127", // 最も濃い緑
] as const;

type ValueToColorMapping = {
  maxVal?: number;
  color: string;
};

const valueToColorMappings: ValueToColorMapping[] = [
  { maxVal: 1, color: heatmapColors[1] }, // Light green
  { maxVal: 3, color: heatmapColors[2] }, // Medium green
  { maxVal: 5, color: heatmapColors[3] }, // Dark green
  { color: heatmapColors[4] }, // Very dark green
];

export const valueToColor = (value?: number): string => {
  if (value === undefined) return heatmapColors[0];
  for (const mapping of valueToColorMappings) {
    if (!mapping.maxVal || value < mapping.maxVal) {
      return mapping.color;
    }
  }
  return heatmapColors[4];
};

export const maxDifficultyToColor = (value?: number): string => {
  return value === undefined ? heatmapColors[0] : getColorCodeFromRating(value);
};
