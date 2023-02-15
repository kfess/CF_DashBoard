import React from "react";
import type { Submission } from "@features/submission/submission";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import {
  ratingColor,
  getColorNameFromRating,
  ratingColorInfo,
} from "@features/color/ratingColor";
import type { RatingColor } from "@features/color/ratingColor";
import { DifficultyPie } from "@features/achievement/components/DifficultyPie";

type Props = {
  submissions: Submission[];
};

type ColorCount = { [C in RatingColor]: number };

export const DifficultyPies: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const { data, isError, error, isLoading } = useFetchProblems(); // all problems

  const coloredProblems: ColorCount | undefined = data?.reduce((obj, d) => {
    const color: RatingColor = getColorNameFromRating(d.rating);
    return { ...obj, [color]: (obj[color] ?? 0) + 1 };
  }, {} as ColorCount);

  return (
    <>
      {coloredProblems &&
        ratingColor.map((color) => (
          <DifficultyPie
            key={color}
            colorInfo={ratingColorInfo[color]}
            problemsCount={coloredProblems[color]}
          />
        ))}
    </>
  );
};
