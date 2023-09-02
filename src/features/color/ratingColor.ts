import { Mode } from "@features/color/@types/theme";
import type { Classification } from "@features/contests/contest";

export const ratingColor = [
  "Black",
  "Gray",
  "Green",
  "Cyan",
  "Blue",
  "Violet",
  "LightOrange",
  "DeepOrange",
  "LightRed",
  "Red",
  "DeepRed",
] as const;
export type RatingColor = typeof ratingColor[number];

// for theme color (base, purple, green)
export type ColorCode =
  | "#1a1a1a" // Black
  | "#7F8081" // Gray
  | "#008000" // Green
  | "#22AEA6" // Cyan
  | "#0F06FF" // Blue
  | "#AA00AA" // Violet
  | "#E3CA0F" // LightOrange, this color looks yellowish
  | "#FF8E0E" // DeepOrange
  | "#FF7777" // LightRed
  | "#FE0A04" // Red
  | "#AA0100"; // DeepRed

// for therme color (dark)
type DarkColorCode =
  | "#ffffff" // Black
  | "#9FA0A1" // Gray // need Change!
  | "#00A600" // Green // need Change!
  | "#33C0B9" // Cyan // need Change!
  | "#3F46FF" // Blue // need Change!
  | "#CC00CC" // Violet // need Change!
  | "#FFE44D" // LightOrange // need Change!
  | "#FFA632" // DeepOrange // need Change!
  | "#FF9999" // LightRed // need Change!
  | "#FF2C18" // Red // need Change!
  | "#CC0300"; // DeepRed // need Change!

type Title =
  | "Legendary Grandmaster" // DeepRed
  | "International Grandmaster" // Red
  | "Grandmaster" // LightRed
  | "International Master" // DeepOrange
  | "Master" // LightOrange
  | "Candidate Master" // Violet
  | "Expert" // Blue
  | "Specialist" // Cyan
  | "Pupil" // Green
  | "Newbie" // Gray
  | "No Data"; // Black

export type RatingColorInfo = {
  [C in RatingColor]: {
    readonly name: C;
    readonly colorCode: ColorCode;
    readonly darkColorCode: DarkColorCode;
    readonly lowerBound: number;
    readonly upperBound: number;
    readonly title: Title;
  };
};

const MAX_RATING = 5000; // max rating of Codeforces?
const NO_RATING = -1;

export const ratingColorInfo: RatingColorInfo = {
  Black: {
    name: "Black",
    colorCode: "#1a1a1a",
    darkColorCode: "#ffffff",
    lowerBound: NO_RATING,
    upperBound: NO_RATING,
    title: "No Data",
  },
  Gray: {
    name: "Gray",
    colorCode: "#7F8081",
    darkColorCode: "#9FA0A1",
    lowerBound: 0,
    upperBound: 1199,
    title: "Newbie",
  },
  Green: {
    name: "Green",
    colorCode: "#008000",
    darkColorCode: "#00A600",
    lowerBound: 1200,
    upperBound: 1399,
    title: "Pupil",
  },
  Cyan: {
    name: "Cyan",
    colorCode: "#22AEA6",
    darkColorCode: "#33C0B9",
    lowerBound: 1400,
    upperBound: 1599,
    title: "Specialist",
  },
  Blue: {
    name: "Blue",
    colorCode: "#0F06FF",
    darkColorCode: "#3F46FF",
    lowerBound: 1600,
    upperBound: 1899,
    title: "Expert",
  },
  Violet: {
    name: "Violet",
    colorCode: "#AA00AA",
    darkColorCode: "#CC00CC",
    lowerBound: 1900,
    upperBound: 2099,
    title: "Candidate Master",
  },
  LightOrange: {
    name: "LightOrange",
    colorCode: "#E3CA0F",
    darkColorCode: "#FFE44D",
    lowerBound: 2100,
    upperBound: 2299,
    title: "Master",
  },
  DeepOrange: {
    name: "DeepOrange",
    colorCode: "#FF8E0E",
    darkColorCode: "#FFA632",
    lowerBound: 2300,
    upperBound: 2399,
    title: "International Master",
  },
  LightRed: {
    name: "LightRed",
    colorCode: "#FF7777",
    darkColorCode: "#FF9999",
    lowerBound: 2400,
    upperBound: 2599,
    title: "Grandmaster",
  },
  Red: {
    name: "Red",
    colorCode: "#FE0A04",
    darkColorCode: "#FF2C18",
    lowerBound: 2600,
    upperBound: 2999,
    title: "International Grandmaster",
  },
  DeepRed: {
    name: "DeepRed",
    colorCode: "#AA0100",
    darkColorCode: "#CC0300",
    lowerBound: 3000,
    upperBound: MAX_RATING,
    title: "Legendary Grandmaster",
  },
};

export const getRatingColorInfo = (
  rating?: number,
  themeColor: Mode = "light"
) => {
  const colorInfo = Object.values(ratingColorInfo).find((info) => {
    if (rating === undefined) {
      return info.name === "Black";
    }
    return rating >= info.lowerBound && rating <= info.upperBound;
  });

  if (colorInfo) {
    return {
      ...colorInfo,
      colorCode:
        themeColor === "light" ? colorInfo.colorCode : colorInfo.darkColorCode,
    };
  }
  return ratingColorInfo["Black"];
};

export const getColorNameFromRating = (rating?: number): RatingColor => {
  return getRatingColorInfo(rating).name;
};

export const getColorCodeFromRating = (
  rating?: number,
  themeColor: Mode = "light"
): ColorCode | DarkColorCode => {
  return getRatingColorInfo(rating, themeColor).colorCode;
};

export const getColorCodeFromClassification = (
  classification: Classification
): [ColorCode, ColorCode] => {
  const defaultColorCodes: [ColorCode, ColorCode] = [
    ratingColorInfo.Gray.colorCode,
    ratingColorInfo.DeepRed.colorCode,
  ];

  switch (classification) {
    case "All":
    case "Educational":
    case "Global":
    case "ICPC":
    case "Kotlin Heroes":
    case "Others":
      return defaultColorCodes;
    case "Div. 4":
      return [ratingColorInfo.Gray.colorCode, ratingColorInfo.Green.colorCode];
    case "Div. 3":
      return [ratingColorInfo.Gray.colorCode, ratingColorInfo.Cyan.colorCode];
    case "Div. 2":
      return [ratingColorInfo.Blue.colorCode, ratingColorInfo.Violet.colorCode];
    case "Div. 1 + Div. 2":
      return [
        ratingColorInfo.Violet.colorCode,
        ratingColorInfo.DeepRed.colorCode,
      ];
    case "Div. 1":
      return [
        ratingColorInfo.LightOrange.colorCode,
        ratingColorInfo.DeepRed.colorCode,
      ];
  }
};

export const calcFillPercent = (rating?: number) => {
  if (rating == null) {
    return 1;
  } else if (rating <= ratingColorInfo["Gray"].upperBound) {
    return (rating - 800) / 400;
  } else if (rating < ratingColorInfo["Green"].upperBound) {
    return 1 - (1400 - rating) / 200;
  } else if (rating < ratingColorInfo["Cyan"].upperBound) {
    return 1 - (1600 - rating) / 200;
  } else if (rating < ratingColorInfo["Blue"].upperBound) {
    return 1 - (1900 - rating) / 300;
  } else if (rating < ratingColorInfo["Violet"].upperBound) {
    return 1 - (2100 - rating) / 200;
  } else if (rating < ratingColorInfo["LightOrange"].upperBound) {
    return 1 - (2300 - rating) / 300;
  } else if (rating < ratingColorInfo["DeepOrange"].upperBound) {
    return 1 - (2400 - rating) / 300;
  } else if (rating < ratingColorInfo["Red"].upperBound) {
    return 1 - (2600 - rating) / 200;
  } else {
    return 1;
  }
};
