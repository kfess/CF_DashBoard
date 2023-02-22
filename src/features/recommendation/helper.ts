import {
  MEDIAN_RATING,
  RecommendLevel,
} from "@features/recommendation/recommend";
import { solveProbability } from "@features/recommendation/recommend";

export const calsSolveProbability = (
  userRating: number,
  difficulty: number
): number =>
  Math.round((10 * 100) / (1 + 10 ** ((difficulty - userRating) / 400))) / 10;

export const recommendDifficultyRange = (
  userRating: number | undefined,
  level: RecommendLevel
): [number, number] => {
  const lowerDifficulty =
    100 *
    Math.round(
      (400 * Math.log10(1 / solveProbability[level].upperProb - 1) +
        (userRating ?? MEDIAN_RATING)) /
        100
    );
  const upperDifficulty =
    100 *
    Math.round(
      (400 * Math.log10(1 / solveProbability[level].lowerProb - 1) +
        (userRating ?? MEDIAN_RATING)) /
        100
    );

  return [lowerDifficulty, upperDifficulty];
};
