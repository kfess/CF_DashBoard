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
  type: RatingColor;
  colorCode: ColorCode;
  lowerBound: number;
  upperBound: number;
  title: Title;
};

const MAX_RATING = 5000; // max rating of Codeforces?
const NO_RATING = -1;

const blackRating: RatingInfo = {
  type: "Black",
  colorCode: "#000000",
  lowerBound: NO_RATING,
  upperBound: NO_RATING,
  title: "No Data",
};

const grayRating: RatingInfo = {
  type: "Gray",
  colorCode: "#CCCCCC",
  lowerBound: 0,
  upperBound: 1199,
  title: "Newbie",
};

const greenRating: RatingInfo = {
  type: "Green",
  colorCode: "#76DEBB",
  lowerBound: 1200,
  upperBound: 1399,
  title: "Pupil",
};

const cyanRating: RatingInfo = {
  type: "Cyan",
  colorCode: "#76FF77",
  lowerBound: 1400,
  upperBound: 1599,
  title: "Specialist",
};

const blueRating: RatingInfo = {
  type: "Blue",
  colorCode: "#AAAAFF",
  lowerBound: 1600,
  upperBound: 1899,
  title: "Expert",
};

const violetRating: RatingInfo = {
  type: "Violet",
  colorCode: "#FF88FF",
  lowerBound: 1900,
  upperBound: 2099,
  title: "Candidate Master",
};

const lightOrangeRating: RatingInfo = {
  type: "LightOrange",
  colorCode: "#FFCC87",
  lowerBound: 2100,
  upperBound: 2299,
  title: "Master",
};

const deepOrangeRating: RatingInfo = {
  type: "DeepOrange",
  colorCode: "#FFBB55",
  lowerBound: 2300,
  upperBound: 2399,
  title: "International Master",
};

const lightRedRating: RatingInfo = {
  type: "LightRed",
  colorCode: "#FF7777",
  lowerBound: 2400,
  upperBound: 2599,
  title: "Grandmaster",
};

const redRating: RatingInfo = {
  type: "Red",
  colorCode: "#FF3333",
  lowerBound: 2600,
  upperBound: 2999,
  title: "International Grandmaster",
};

const deepRedRating: RatingInfo = {
  type: "DeepRed",
  colorCode: "#AA0100",
  lowerBound: 3000,
  upperBound: MAX_RATING,
  title: "Legendary Grandmaster",
};

export const getColorCodeFromRating = (
  rating: number | undefined
): ColorCode => {
  if (rating == null) {
    return blackRating.colorCode;
  } else if (rating <= grayRating.upperBound) {
    return grayRating.colorCode;
  } else if (rating <= greenRating.upperBound) {
    return greenRating.colorCode;
  } else if (rating <= cyanRating.upperBound) {
    return cyanRating.colorCode;
  } else if (rating <= blueRating.upperBound) {
    return blueRating.colorCode;
  } else if (rating <= violetRating.upperBound) {
    return violetRating.colorCode;
  } else if (rating <= lightOrangeRating.upperBound) {
    return lightOrangeRating.colorCode;
  } else if (rating <= deepOrangeRating.upperBound) {
    return deepOrangeRating.colorCode;
  } else if (rating <= lightRedRating.upperBound) {
    return lightRedRating.colorCode;
  } else if (rating <= redRating.upperBound) {
    return redRating.colorCode;
  } else {
    return deepRedRating.colorCode;
  }
};

// To Do
export const calcFillRatio = (rating: number | undefined) => {
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
