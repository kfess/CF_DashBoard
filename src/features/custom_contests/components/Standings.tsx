import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Problem } from "@features/problems/problem";
import { useFetchSubmissions } from "@features/custom_contests/useFetchSubmissions";
import { useToggle } from "@hooks/index";
import { UserStats, calculateAllUsersStats } from "../calculateStandings";

type Props = {
  participants: { userId: string }[];
  problems: Problem[];
  startDate: string;
  endDate: string;
  penalty: number;
};

// 各ユーザーのサブミッション状況は、codeforces API を直接叩いて取得する。

export const Standings: React.FC<Props> = (props: Props) => {
  const { problems, participants, startDate, endDate, penalty } = props;
  const numParticipants = participants.length;

  const [autoRefetch, toggleAutoRefetch] = useToggle(true);

  const { submissionsByUser, isError, error, isLoading } = useFetchSubmissions(
    participants,
    problems,
    startDate,
    endDate,
    autoRefetch
  );

  const userStats = useMemo(() => {
    if (!submissionsByUser) {
      return {};
    }
    return calculateAllUsersStats(
      submissionsByUser,
      problems,
      startDate,
      penalty
    );
  }, [submissionsByUser, problems]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Codeforces User Id</TableCell>
                <TableCell>Penalty</TableCell>
                <TableCell>Score</TableCell>
                {problems.map((_, idx) => (
                  <TableCell>{idx + 1}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow>
                  <TableCell>{participant.userId}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                  {problems.map((problem) => (
                    <TableCell>{}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
