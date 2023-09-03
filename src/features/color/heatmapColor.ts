import { getColorCodeFromRating } from "@features/color/ratingColor";

const noActivityColor = (isDarkMode: boolean) =>
  isDarkMode ? "#2d333b" : "#ebedf0";

export const heatmapColors = [
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
  { maxVal: 1, color: heatmapColors[0] }, // Light green
  { maxVal: 3, color: heatmapColors[1] }, // Medium green
  { maxVal: 5, color: heatmapColors[2] }, // Dark green
  { color: heatmapColors[3] }, // Very dark green
];

export const valueToColor = (
  value?: number,
  isDarkMode: boolean = false
): string => {
  if (value === undefined) return noActivityColor(isDarkMode);
  for (const mapping of valueToColorMappings) {
    if (!mapping.maxVal || value < mapping.maxVal) {
      return mapping.color;
    }
  }
  return heatmapColors[3];
};

export const maxDifficultyToColor = (
  value?: number,
  isDarkMode = false
): string => {
  return value === undefined
    ? noActivityColor(isDarkMode)
    : getColorCodeFromRating(value);
};
