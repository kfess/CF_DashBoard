// import React from "react";
// import Stack from "@mui/material/Stack";
// import type { Submission } from "@features/submission/submission";
// import {
//   isACSubmission,
//   filterUniqueSubmissions,
//   sumSubmissionsRating,
// } from "@features/achievement/processSubmission";

// type Props = { submissions: Submission[] };

// export const TotalRatingSum: React.FC<Props> = (props: Props) => {
//   const { submissions } = props;
//   const ACSubmissions = submissions.filter(isACSubmission);
//   const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);
//   const sum = sumSubmissionsRating(uniqueACSubmissions) ?? 0;

//   return (
//     <>
//       <div>
//         <strong>Rated Point Sum</strong>
//       </div>
//       <Stack direction="row" sx={{ display: "flex", m: 1 }}>
//         <div>
//           <strong>{sum.toLocaleString()}</strong>{" "}
//           <span css={{ fontSize: "14px", color: "gray" }}>points</span>
//         </div>
//       </Stack>
//     </>
//   );
// };

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
  sumSubmissionsRating,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[] };

export const TotalRatingSum: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);
  const sum = sumSubmissionsRating(uniqueACSubmissions) ?? 0;

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h6" gutterBottom>
        Rated Point Sum
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {sum.toLocaleString()}{" "}
        <Typography variant="body2" color="text.secondary" component="span">
          points
        </Typography>
      </Typography>
    </Box>
  );
};
