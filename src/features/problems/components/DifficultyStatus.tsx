import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Problem } from "@features/problems/problem";
import {
  ratingColor,
  getColorNameFromRating,
  ratingColorInfo,
} from "@features/color/ratingColor";
import type { RatingColor } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";
import {
  filterUniqueSubmissions,
  isACSubmission,
  isGymSubmission,
} from "@features/achievement/processSubmission";

type Props = {
  problems: Problem[];
};

type ColorCount = { [C in RatingColor]: number };

export const DifficultyStatus: React.FC<Props> = ({ problems }) => {
  const searchUserId = useQueryParams(QueryParamKeys.USERID);
  const {
    data: submission,
    isError,
    isLoading,
  } = useFetchUserSubmission({
    userId: searchUserId,
  });

  const coloredSubmission: ColorCount | undefined = filterUniqueSubmissions(
    submission?.filter(
      (submission) => isACSubmission(submission) && !isGymSubmission(submission)
    ) ?? []
  ).reduce((obj, d) => {
    const color: RatingColor = getColorNameFromRating(d.problem.rating);
    return { ...obj, [color]: (obj[color] ?? 0) + 1 };
  }, {} as ColorCount);

  const coloredProblems: ColorCount | undefined = problems?.reduce((obj, d) => {
    const color: RatingColor = getColorNameFromRating(d.rating);
    return { ...obj, [color]: (obj[color] ?? 0) + 1 };
  }, {} as ColorCount);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
      <Paper sx={{ width: "98%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table css={{ height: "100%" }}>
            <TableHead>
              <TableRow hover>
                <TableCell>Difficulty</TableCell>
                {ratingColor.map((color) => (
                  <TableCell>
                    <div
                      css={{
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <ColoredCircle color={ratingColorInfo[color].colorCode} />{" "}
                      {ratingColorInfo[color].lowerBound} -
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>Total ({problems.length})</TableCell>
                {ratingColor.map((color) => (
                  <TableCell>
                    <div
                      css={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {coloredProblems[color]}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              {searchUserId && (
                <TableRow hover>
                  <TableCell>{searchUserId}</TableCell>
                  {ratingColor.map((color) => (
                    <TableCell>
                      <div
                        css={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {coloredSubmission[color] || 0}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
