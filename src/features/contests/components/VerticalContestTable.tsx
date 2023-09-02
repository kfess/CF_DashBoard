import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@features/ui/component/TablePagination";
import { usePagination } from "@hooks/usePagination";
import type { Contest } from "@features/contests/contest";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { getProblemKey } from "@features/problems/utils";
import { useThemeContext } from "@features/color/themeColor.hook";
import { calcSolvedStatus } from "@features/contests/utils/solvedStatus";

type Props = {
  contests: Contest[];
  showDifficulty: boolean;
  readonly solvedSet?: Set<string>;
  readonly attemptedSet?: Set<string>;
};

export const VerticalContestTable: React.FC<Props> = ({
  contests,
  showDifficulty,
  solvedSet,
  attemptedSet,
}) => {
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(contests);
  const slicedContests = useMemo(
    () => contests.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [contests, page]
  );
  const contestsLen = useMemo(() => contests.length, [contests]);

  return (
    <>
      <TablePagination
        size={contestsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {slicedContests.map((c) => (
              <VerticalContestTableRow
                key={c.id}
                contest={c}
                showDifficulty={showDifficulty}
                solvedSet={solvedSet}
                attemptedSet={attemptedSet}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        size={contestsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};

type VerticalContestTableRow = {
  contest: Contest;
  showDifficulty: boolean;
  readonly solvedSet?: Set<string>;
  readonly attemptedSet?: Set<string>;
};

const VerticalContestTableRow: React.FC<VerticalContestTableRow> = ({
  contest,
  showDifficulty,
  solvedSet,
  attemptedSet,
}) => {
  const { theme } = useThemeContext();

  const rowColor = useMemo(() => {
    return calcSolvedStatus(contest, solvedSet) === "Completed"
      ? theme.colors.acColor
      : "";
  }, [contest.problems, solvedSet]);

  const cellColor = useMemo(() => {
    return contest.problems
      .sort((a, b) => a.index.localeCompare(b.index))
      .map((p) => {
        const problemKey = getProblemKey(p);
        const isSolved = solvedSet?.has(problemKey);
        const isAttempted = attemptedSet?.has(problemKey);
        return isSolved
          ? theme.colors.acColor
          : isAttempted
          ? theme.colors.waColor
          : "";
      });
  }, [contest.problems, solvedSet, attemptedSet]);

  return (
    <React.Fragment key={contest.id}>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          colSpan={2}
          sx={{
            backgroundColor: rowColor,
          }}
        >
          <ContestLink
            contestId={contest.id}
            contestName={contest.name}
            classification={contest.classification}
          />
        </TableCell>
      </TableRow>
      {contest.problems
        .sort((a, b) => a.index.localeCompare(b.index))
        .map((p, idx) => (
          <TableRow key={p.index}>
            <TableCell sx={{ p: 0 }}></TableCell>
            <TableCell
              sx={{
                backgroundColor: cellColor[idx],
              }}
            >
              <ProblemLink
                key={p.index}
                showDifficulty={showDifficulty}
                contestId={contest.id}
                contestName={contest.name}
                problemId={p.index}
                problemName={p.name}
                difficulty={p.rating}
                solvedCount={p.solvedCount}
              />
            </TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  );
};
