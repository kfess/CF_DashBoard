import React from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Contest } from "@features/contests/contest";
import { ContestTableRow } from "@features/contests/components/ContestTableRow";

type Props = {
  contests: Contest[];
  problemIdxes: string[];
};

export const ContestsTable: React.FC<Props> = (props: Props) => {
  const { contests, problemIdxes } = props;
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Contest</TableCell>
          {problemIdxes.map((idx) => (
            <TableCell>{idx}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      {contests.map((contest) => (
        <ContestTableRow
          contestId={contest.id}
          contestName={contest.name}
          problems={contest.problems}
        />
      ))}
    </TableContainer>
  );
};
