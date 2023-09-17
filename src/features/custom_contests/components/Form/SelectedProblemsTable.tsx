import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { ContestLink } from "@features/contests/components/ContestLink";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { IconButton } from "@features/ui/component/IconButton";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";
import { Button } from "@features/ui/component/Button";

type Props = {
  isEdit?: boolean;
  fields?: FieldArrayWithId<CreateCustomContest, "problems", "id">[];
  remove?: UseFieldArrayRemove;
  append?: UseFieldArrayAppend<CreateCustomContest, "problems">;
  formData?: CreateCustomContest; // for ViewStep in non-edit mode
};

export const SelectedProblemsTable: React.FC<Props> = ({
  isEdit = true,
  fields = [],
  remove = () => {},
  append = () => {},
  formData,
}) => {
  const problems = isEdit ? fields : formData?.problems ?? [];

  const [isOpenAddProblemRow, setIsOpenAddProblemRow] = useState(false);

  return (
    <>
      {problems.length > 0 && (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  height: "100%",
                  border: (theme) => `0.5px solid ${theme.palette.divider}`,
                }}
              >
                <TableHead>
                  <TableRow hover>
                    <TableCell>#</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>Contest</TableCell>
                    <TableCell>Difficulty</TableCell>
                    {isEdit && <TableCell>Delete</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {problems
                    .sort((a, b) =>
                      !isEdit && (a.rating || 0) > (b.rating || 0) ? 1 : -1
                    )
                    .map((p, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <ProblemLink
                            contestId={p.contestId ?? 0}
                            contestName={p.contestName ?? ""}
                            problemId={p.index}
                            problemName={p.name}
                            difficulty={p.rating}
                            showDifficulty={true}
                            showBookmarked={false}
                          />
                        </TableCell>
                        <TableCell>
                          <ContestLink
                            contestId={p.contestId ?? 0}
                            contestName={p.contestName ?? ""}
                            classification={p.classification ?? "Others"}
                            showBookmarked={false}
                          />
                        </TableCell>
                        <TableCell>
                          {p.rating?.toLocaleString() || (
                            <HelpToolTip title="No data available" />
                          )}
                        </TableCell>
                        {isEdit && (
                          <TableCell>
                            <IconButton
                              icon={
                                <>
                                  {index} <DeleteIcon />
                                </>
                              }
                              onClick={() => {
                                remove(index);
                              }}
                              size="small"
                              aria-label="delete problems"
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  {isEdit && isOpenAddProblemRow && (
                    <TableRow>
                      <TableCell colSpan={5}></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
      {problems.length === 0 && (
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{
              border: (theme) => `0.5px solid ${theme.palette.divider}`,
            }}
          >
            <TableRow>
              <TableCell colSpan={5}>
                <NoDataMessage
                  title="You have not added any problems yet."
                  message="Generated problems are listed here."
                  height="300px"
                />
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      )}
      {isEdit && problems.length > 0 && (
        <Box mt={1.5} mx={1}>
          <Button
            onClick={() => {
              append({
                contestId: 1111111111,
                contestName: "Contest Name",
                classification: "Others",
                name: "Problem Name",
                type: "PROGRAMMING",
                rating: Math.round(Math.random() * 5000),
                index: "A",
                tags: [],
              });
              // setIsOpenAddProblemRow(!isOpenAddProblemRow);
            }}
            startIcon={<AddIcon />}
            color="secondary"
          >
            Add problem
          </Button>
        </Box>
      )}
    </>
  );
};
