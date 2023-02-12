import { ThemeColor } from "@features/color/@types/theme";

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
type ColorCode =
  | "#000000" // Black
  | "#CCCCCC" // Gray
  | "#76DEBB" // Green
  | "#76FF77" // Cyan
  | "#AAAAFF" // Blue
  | "#FF88FF" // Violet
  | "#FFCC87" // LightOrange
  | "#FFBB55" // DeepOrange
  | "#FF7777" // LightRed
  | "#FF3333" // Red
  | "#AA0100"; // DeepRed

// for therme color (dark)
type DarkColorCode =
  | "#202020" // Black
  | "#CCCCCC" // Gray // need Change!
  | "#76DEBB" // Green // need Change!
  | "#76FF77" // Cyan // need Change!
  | "#AAAAFF" // Blue // need Change!
  | "#FF88FF" // Violet // need Change!
  | "#FFCC87" // LightOrange // need Change!
  | "#FFBB55" // DeepOrange // need Change!
  | "#FF7777" // LightRed // need Change!
  | "#FF3333" // Red // need Change!
  | "#AA0100"; // DeepRed // need Change!

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

const ratingColorInfo: RatingColorInfo = {
  Black: {
    name: "Black",
    colorCode: "#000000",
    darkColorCode: "#202020",
    lowerBound: NO_RATING,
    upperBound: NO_RATING,
    title: "No Data",
  },
  Gray: {
    name: "Gray",
    colorCode: "#CCCCCC",
    darkColorCode: "#CCCCCC",
    lowerBound: 0,
    upperBound: 1199,
    title: "Newbie",
  },
  Green: {
    name: "Green",
    colorCode: "#76DEBB",
    darkColorCode: "#76DEBB",
    lowerBound: 1200,
    upperBound: 1399,
    title: "Pupil",
  },
  Cyan: {
    name: "Cyan",
    colorCode: "#76FF77",
    darkColorCode: "#76FF77",
    lowerBound: 1400,
    upperBound: 1599,
    title: "Specialist",
  },
  Blue: {
    name: "Blue",
    colorCode: "#AAAAFF",
    darkColorCode: "#AAAAFF",
    lowerBound: 1600,
    upperBound: 1899,
    title: "Expert",
  },
  Violet: {
    name: "Violet",
    colorCode: "#FF88FF",
    darkColorCode: "#FF88FF",
    lowerBound: 1900,
    upperBound: 2099,
    title: "Candidate Master",
  },
  LightOrange: {
    name: "LightOrange",
    colorCode: "#FFCC87",
    darkColorCode: "#FFCC87",
    lowerBound: 2100,
    upperBound: 2299,
    title: "Master",
  },
  DeepOrange: {
    name: "DeepOrange",
    colorCode: "#FFBB55",
    darkColorCode: "#FFBB55",
    lowerBound: 2300,
    upperBound: 2399,
    title: "International Master",
  },
  LightRed: {
    name: "LightRed",
    colorCode: "#FF7777",
    darkColorCode: "#FF7777",
    lowerBound: 2400,
    upperBound: 2599,
    title: "Grandmaster",
  },
  Red: {
    name: "Red",
    colorCode: "#FF3333",
    darkColorCode: "#FF3333",
    lowerBound: 2600,
    upperBound: 2999,
    title: "International Grandmaster",
  },
  DeepRed: {
    name: "DeepRed",
    colorCode: "#AA0100",
    darkColorCode: "#AA0100",
    lowerBound: 3000,
    upperBound: MAX_RATING,
    title: "Legendary Grandmaster",
  },
};

export const getRatingColorInfo = (rating: number | undefined) => {
  if (rating == null) {
    return ratingColorInfo["Black"];
  } else if (rating <= ratingColorInfo["Gray"].upperBound) {
    return ratingColorInfo["Gray"];
  } else if (rating <= ratingColorInfo["Green"].upperBound) {
    return ratingColorInfo["Green"];
  } else if (rating <= ratingColorInfo["Cyan"].upperBound) {
    return ratingColorInfo["Cyan"];
  } else if (rating <= ratingColorInfo["Blue"].upperBound) {
    return ratingColorInfo["Blue"];
  } else if (rating <= ratingColorInfo["Violet"].upperBound) {
    return ratingColorInfo["Violet"];
  } else if (rating <= ratingColorInfo["LightOrange"].upperBound) {
    return ratingColorInfo["LightOrange"];
  } else if (rating <= ratingColorInfo["DeepOrange"].upperBound) {
    return ratingColorInfo["DeepOrange"];
  } else if (rating <= ratingColorInfo["LightRed"].upperBound) {
    return ratingColorInfo["LightRed"];
  } else if (rating <= ratingColorInfo["Red"].upperBound) {
    return ratingColorInfo["Red"];
  } else {
    return ratingColorInfo["DeepRed"];
  }
};

const isDarkThemeColor = (themeColor: ThemeColor) => themeColor === "dark";

export const getColorCodeFromRating = (
  rating: number | undefined,
  themeColor: ThemeColor = "base" // default theme
): ColorCode | DarkColorCode => {
  if (rating == null) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Black"].colorCode
      : ratingColorInfo["Black"].darkColorCode;
  } else if (rating <= ratingColorInfo["Gray"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Gray"].colorCode
      : ratingColorInfo["Gray"].darkColorCode;
  } else if (rating <= ratingColorInfo["Green"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Green"].colorCode
      : ratingColorInfo["Green"].darkColorCode;
  } else if (rating <= ratingColorInfo["Cyan"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Cyan"].colorCode
      : ratingColorInfo["Cyan"].darkColorCode;
  } else if (rating <= ratingColorInfo["Blue"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Blue"].colorCode
      : ratingColorInfo["Blue"].darkColorCode;
  } else if (rating <= ratingColorInfo["Violet"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Violet"].colorCode
      : ratingColorInfo["Violet"].darkColorCode;
  } else if (rating <= ratingColorInfo["LightOrange"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["LightOrange"].colorCode
      : ratingColorInfo["LightOrange"].darkColorCode;
  } else if (rating <= ratingColorInfo["DeepOrange"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["DeepOrange"].colorCode
      : ratingColorInfo["DeepOrange"].darkColorCode;
  } else if (rating <= ratingColorInfo["LightRed"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["LightRed"].colorCode
      : ratingColorInfo["LightRed"].darkColorCode;
  } else if (rating <= ratingColorInfo["Red"].upperBound) {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["Red"].colorCode
      : ratingColorInfo["Red"].darkColorCode;
  } else {
    return !isDarkThemeColor(themeColor)
      ? ratingColorInfo["DeepRed"].colorCode
      : ratingColorInfo["DeepRed"].darkColorCode;
  }
};

// To Do
export const calcFillPercent = (rating: number | undefined) => {
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
