import { getColorCodeFromRating } from "@features/color/ratingColor";

export const heatmapColors = [
  "#ebedf0",
  "#d2baff",
  "#b094ff",
  "#9246ff",
  "#7112cc",
] as const;

interface ValueToColorMapping {
  maxVal?: number;
  color: string;
}

const valueToColorMappings: ValueToColorMapping[] = [
  { maxVal: 1, color: heatmapColors[1] }, // Light purple
  { maxVal: 3, color: heatmapColors[2] }, // Purple
  { maxVal: 5, color: heatmapColors[3] }, // Dark purple
  { color: heatmapColors[4] }, // Very dark purple
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
