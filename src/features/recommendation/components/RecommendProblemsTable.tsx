import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { RecommendLevel } from "@features/recommendation/recommend";
import { recommendDifficultyRange } from "@features/recommendation/helper";
import type { Problem } from "@features/problems/problem";
import { ProblemsTableRow } from "@features/problems/components/ProblemsTableRow";
import { getRandomElements } from "@helpers/random";
import { getProblemKey } from "@features/problems/utils";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";

type Props = {
  level: RecommendLevel;
  userRating?: number;
  problems: Problem[];
};

export const RecommendProblemsTable: React.FC<Props> = (props: Props) => {
  const { userRating, level, problems } = props;
  const [lowerDifficulty, upperDifficulty] = recommendDifficultyRange(
    userRating,
    level
  );

  const filteredProblems = useMemo(() => {
    return getRandomElements(
      problems.filter(
        (problem) =>
          (problem.rating ?? 0) >= lowerDifficulty &&
          (problem.rating ?? 0) <= upperDifficulty
      ),
      20
    );
  }, [problems]);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
        }}
        elevation={0}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Problem
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Contest
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Difficulty
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Solved
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Solution
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProblems.length > 0 ? (
                filteredProblems
                  .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0))
                  .map((problem) => (
                    <ProblemsTableRow
                      key={getProblemKey(problem)}
                      problem={problem}
                      showTags={false}
                      backgroundColor=""
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <NoDataMessage
                      title="No Recommendations Found"
                      message="Your rating may be too low or too high for this recommendation level."
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
