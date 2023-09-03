import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { groupByProblem } from "@features/achievement/processSubmission";
import { pluralize } from "@helpers/format";

type Props = {
  allSubmissions: Submission[];
};

type SubmissionStats = {
  aveSubmissionsBeforeAC: number;
  firstTryACCount: number;
  acCount?: number;
};

const calcSubmissionStats = (allSubmissions: Submission[]): SubmissionStats => {
  const submissionsGroupedByProblem = groupByProblem(allSubmissions);

  const results = submissionsGroupedByProblem.reduce(
    (acc, [, submissionsForProblem]) => {
      const sortedSubmissions = submissionsForProblem.sort(
        (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
      );

      let submissionsCountBeforeAC = 0;
      const isFirstTryAC = sortedSubmissions[0]?.verdict === "OK";
      const isAC = sortedSubmissions.some((submission) => {
        if (submission.verdict === "OK") return true;
        submissionsCountBeforeAC++;
        return false;
      });

      if (isFirstTryAC) {
        acc.firstTryACCount++;
      }
      if (isAC) {
        acc.totalSubmissionsBeforeAC += submissionsCountBeforeAC;
        acc.acCount++;
      }

      return acc;
    },
    { totalSubmissionsBeforeAC: 0, acCount: 0, firstTryACCount: 0 }
  );

  if (results.acCount === 0) {
    return {
      aveSubmissionsBeforeAC: 0,
      firstTryACCount: 0,
      acCount: 0,
    };
  }

  return {
    aveSubmissionsBeforeAC: results.totalSubmissionsBeforeAC / results.acCount,
    firstTryACCount: results.firstTryACCount,
    acCount: results.acCount,
  };
};

export const Accuracy: React.FC<Props> = ({ allSubmissions }) => {
  // AC するまでの submission 数
  // 1回 で AC することができた submission 数
  const { aveSubmissionsBeforeAC, firstTryACCount, acCount } = useMemo(
    () => calcSubmissionStats(allSubmissions),
    [allSubmissions]
  );

  return (
    <Box p={1}>
      <Typography variant="h6" gutterBottom>
        Accuracy
      </Typography>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <Box textAlign="center">
          <Typography variant="body1" color="text.secondary">
            Average Attempts
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {aveSubmissionsBeforeAC.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            submissions before First AC
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body1" color="text.secondary">
            First Try AC
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {firstTryACCount.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pluralize(firstTryACCount, "problem")}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body1" color="text.secondary">
            First Try AC Rate
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {!acCount ? "-" : ((firstTryACCount / acCount) * 100).toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            %
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
