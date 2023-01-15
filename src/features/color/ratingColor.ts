import { Theme } from "@features/color/@types/theme";

type RatingColor =
  | "Black"
  | "Gray"
  | "Green"
  | "Cyan"
  | "Blue"
  | "Violet"
  | "LightOrange"
  | "DeepOrange"
  | "LightRed"
  | "Red"
  | "DeepRed";

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

type RatingInfo = {
  readonly type: RatingColor;
  readonly colorCode: ColorCode;
  readonly darkColorCode: DarkColorCode;
  readonly lowerBound: number;
  readonly upperBound: number;
  readonly title: Title;
};

const MAX_RATING = 5000; // max rating of Codeforces?
const NO_RATING = -1;

const blackRating: RatingInfo = {
  type: "Black",
  colorCode: "#000000",
  darkColorCode: "#202020",
  lowerBound: NO_RATING,
  upperBound: NO_RATING,
  title: "No Data",
};

const grayRating: RatingInfo = {
  type: "Gray",
  colorCode: "#CCCCCC",
  darkColorCode: "#CCCCCC",
  lowerBound: 0,
  upperBound: 1199,
  title: "Newbie",
};

const greenRating: RatingInfo = {
  type: "Green",
  colorCode: "#76DEBB",
  darkColorCode: "#76DEBB",
  lowerBound: 1200,
  upperBound: 1399,
  title: "Pupil",
};

const cyanRating: RatingInfo = {
  type: "Cyan",
  colorCode: "#76FF77",
  darkColorCode: "#76FF77",
  lowerBound: 1400,
  upperBound: 1599,
  title: "Specialist",
};

const blueRating: RatingInfo = {
  type: "Blue",
  colorCode: "#AAAAFF",
  darkColorCode: "#AAAAFF",
  lowerBound: 1600,
  upperBound: 1899,
  title: "Expert",
};

const violetRating: RatingInfo = {
  type: "Violet",
  colorCode: "#FF88FF",
  darkColorCode: "#FF88FF",
  lowerBound: 1900,
  upperBound: 2099,
  title: "Candidate Master",
};

const lightOrangeRating: RatingInfo = {
  type: "LightOrange",
  colorCode: "#FFCC87",
  darkColorCode: "#FFCC87",
  lowerBound: 2100,
  upperBound: 2299,
  title: "Master",
};

const deepOrangeRating: RatingInfo = {
  type: "DeepOrange",
  colorCode: "#FFBB55",
  darkColorCode: "#FFBB55",
  lowerBound: 2300,
  upperBound: 2399,
  title: "International Master",
};

const lightRedRating: RatingInfo = {
  type: "LightRed",
  colorCode: "#FF7777",
  darkColorCode: "#FF7777",
  lowerBound: 2400,
  upperBound: 2599,
  title: "Grandmaster",
};

const redRating: RatingInfo = {
  type: "Red",
  colorCode: "#FF3333",
  darkColorCode: "#FF3333",
  lowerBound: 2600,
  upperBound: 2999,
  title: "International Grandmaster",
};

const deepRedRating: RatingInfo = {
  type: "DeepRed",
  colorCode: "#AA0100",
  darkColorCode: "#AA0100",
  lowerBound: 3000,
  upperBound: MAX_RATING,
  title: "Legendary Grandmaster",
};

const isDarkThemeColor = (themeColor: Theme) => themeColor === "dark";

export const getColorCodeFromRating = (
  rating: number | undefined,
  themeColor: Theme = "base" // default theme
): ColorCode | DarkColorCode => {
  if (rating == null) {
    return !isDarkThemeColor(themeColor)
      ? blackRating.colorCode
      : blackRating.darkColorCode;
  } else if (rating <= grayRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? grayRating.colorCode
      : grayRating.darkColorCode;
  } else if (rating <= greenRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? greenRating.colorCode
      : greenRating.darkColorCode;
  } else if (rating <= cyanRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? cyanRating.colorCode
      : cyanRating.darkColorCode;
  } else if (rating <= blueRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? blueRating.colorCode
      : blueRating.darkColorCode;
  } else if (rating <= violetRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? violetRating.colorCode
      : violetRating.darkColorCode;
  } else if (rating <= lightOrangeRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? lightOrangeRating.colorCode
      : lightOrangeRating.darkColorCode;
  } else if (rating <= deepOrangeRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? deepOrangeRating.colorCode
      : deepOrangeRating.darkColorCode;
  } else if (rating <= lightRedRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? lightRedRating.colorCode
      : lightRedRating.darkColorCode;
  } else if (rating <= redRating.upperBound) {
    return !isDarkThemeColor(themeColor)
      ? redRating.colorCode
      : redRating.darkColorCode;
  } else {
    return !isDarkThemeColor(themeColor)
      ? deepRedRating.colorCode
      : deepRedRating.darkColorCode;
  }
};

// To Do
export const calcFillPercent = (rating: number | undefined) => {
  if (rating == null) {
    return 1;
  } else if (rating <= grayRating.upperBound) {
    return (rating - 800) / 400;
  } else if (rating < greenRating.upperBound) {
    return 1 - (1400 - rating) / 200;
  } else if (rating < cyanRating.upperBound) {
    return 1 - (1600 - rating) / 200;
  } else if (rating < blueRating.upperBound) {
    return 1 - (1900 - rating) / 300;
  } else if (rating < violetRating.upperBound) {
    return 1 - (2100 - rating) / 200;
  } else if (rating < lightOrangeRating.upperBound) {
    return 1 - (2300 - rating) / 300;
  } else if (rating < deepOrangeRating.upperBound) {
    return 1 - (2400 - rating) / 300;
  } else if (rating < deepRedRating.upperBound) {
    return 1 - (2600 - rating) / 200;
  } else {
    return 1;
  }
};
