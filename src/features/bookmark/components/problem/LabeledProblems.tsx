import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { ProblemLabel } from "@features/bookmark/problemLabel";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { getProblemKey } from "@features/problems/utils";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

type Props = { label: ProblemLabel };

export const LabeledProblems: React.FC<Props> = ({ label }) => {
  const { deleteProblemFromLabel } = useIndexedDBForProblemLabel();

  return (
    <TableContainer
      component={Paper}
      sx={{ border: 1, borderColor: "divider" }}
      elevation={0}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body2" fontWeight="bold">
                Problem
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight="bold">
                Contest
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight="bold">
                Difficulty
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight="bold">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {label.problems.length > 0 ? (
            label.problems.map((p) => (
              <TableRow key={getProblemKey(p.contestId, p.index, p.name)} hover>
                <TableCell>
                  <ProblemLink
                    showDifficulty={true}
                    contestId={p.contestId as number}
                    contestName={p.contestName}
                    problemId={p.index}
                    problemName={p.name}
                    difficulty={p.rating as number}
                    showBookmarked={false}
                  />
                </TableCell>
                <TableCell>
                  <ContestLink
                    contestId={p.contestId as number}
                    contestName={p.contestName}
                    showBookmarked={false}
                  />
                </TableCell>
                <TableCell>
                  <span css={{ color: getColorCodeFromRating(p.rating) }}>
                    {p.rating?.toLocaleString() ?? (
                      <HelpToolTip title="No data available" />
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <ButtonWithAlertDialog
                    title="Delete"
                    dialogText="Are you sure to delete this problem from this label?"
                    dialogTitle="Confirmation"
                    deleteTarget={label.id as number}
                    deleteFn={() =>
                      deleteProblemFromLabel(label.id as number, {
                        contestId: p.contestId as number,
                        index: p.index,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <NoDataMessage
                  title={`Welcome to label - ${label.name}!`}
                  message="No problems have been added to this label."
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
