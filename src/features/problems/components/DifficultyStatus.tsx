import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Problem } from "@features/problems/problem";
import {
  ratingColor,
  getColorNameFromRating,
  ratingColorInfo,
} from "@features/color/ratingColor";
import type { RatingColor } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { useURLQuery } from "@hooks/useQueryParams";
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
  const { queryParams } = useURLQuery();
  const searchUserId = queryParams["userId"];

  const { data: submission } = useFetchUserSubmission({
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
      <Paper
        sx={{
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
        }}
        elevation={0}
      >
        <TableContainer component={Paper}>
          <Table sx={{ height: "100%" }}>
            <TableHead>
              <TableRow hover>
                <TableCell>Difficulty</TableCell>
                {ratingColor.map((color) => (
                  <TableCell key={color}>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", whiteSpace: "nowrap" }}
                    >
                      <ColoredCircle color={ratingColorInfo[color].colorCode} />{" "}
                      {ratingColorInfo[color].lowerBound !== -1
                        ? ratingColorInfo[color].lowerBound + " ~"
                        : "No Category"}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>Total ({problems.length})</TableCell>
                {ratingColor.map((color) => (
                  <TableCell key={color}>
                    <Stack
                    direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {coloredProblems[color]}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
              {searchUserId && (
                <TableRow hover>
                  <TableCell>{searchUserId}</TableCell>
                  {ratingColor.map((color) => (
                    <TableCell key={color}>
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                          justifyContent: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {coloredSubmission[color] || 0}
                      </Stack>
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
