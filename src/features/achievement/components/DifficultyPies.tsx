// import React from "react";
// import Box from "@mui/material/Box";
// import type { Submission } from "@features/submission/submission";
// import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
// import {
//   ratingColor,
//   getColorNameFromRating,
//   ratingColorInfo,
// } from "@features/color/ratingColor";
// import type { RatingColor } from "@features/color/ratingColor";
// import { DifficultyPie } from "@features/achievement/components/DifficultyPie";

// type Props = {
//   submissions: Submission[];
// };

// type ColorCount = { [C in RatingColor]: number };

// export const DifficultyPies: React.FC<Props> = (props: Props) => {
//   const { submissions } = props;
//   const { data, isError, error, isLoading } = useFetchProblems(); // all problems

//   const coloredProblems: ColorCount | undefined = data?.reduce((obj, d) => {
//     const color: RatingColor = getColorNameFromRating(d.rating);
//     return { ...obj, [color]: (obj[color] ?? 0) + 1 };
//   }, {} as ColorCount);

//   return (
//     <>
//       {coloredProblems && (
//         <Box>
//           {ratingColor.map((color) => (
//             <DifficultyPie
//               key={color}
//               colorInfo={ratingColorInfo[color]}
//               problemsCount={coloredProblems[color]}
//               submissions={submissions.filter(
//                 (submission) =>
//                   (submission.problem.rating ?? -1) >=
//                     ratingColorInfo[color].lowerBound &&
//                   (submission.problem.rating ?? -1) <=
//                     ratingColorInfo[color].upperBound
//               )}
//             />
//           ))}
//         </Box>
//       )}
//     </>
//   );
// };

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { Submission } from "@features/submission/submission";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
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
      {coloredProblems && (
        <Grid container spacing={1}>
          {ratingColor.map((color) => (
            <Grid item xs={12} sm={6} md={4} key={color}>
              <DifficultyPie
                colorInfo={ratingColorInfo[color]}
                problemsCount={coloredProblems[color]}
                submissions={submissions.filter(
                  (submission) =>
                    (submission.problem.rating ?? -1) >=
                      ratingColorInfo[color].lowerBound &&
                    (submission.problem.rating ?? -1) <=
                      ratingColorInfo[color].upperBound
                )}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
