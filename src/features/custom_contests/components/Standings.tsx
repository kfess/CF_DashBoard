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
import { CF_CONTEST_URL } from "@constants/url";
import { CircularProgress } from "@mui/material";

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

  const [autoRefetch, toggleAutoRefetch] = useToggle(true, false);

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

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <>{numParticipants} people participated</>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
                <TableCell>#</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Score</TableCell>
                {problems.map((problem, idx) => (
                  <TableCell>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`${CF_CONTEST_URL}/${problem.contestId}/problem/${problem.index}`}
                    >
                      {idx + 1}
                    </a>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {participants
                // .sort(
                //   (a, b) =>
                //     userStats[b.userId].totalScore -
                //     userStats[a.userId].totalScore
                // )
                .map((participant, i) => {
                  const stats = userStats[participant.userId] || null;
                  return (
                    <TableRow hover>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{participant.userId}</TableCell>
                      <TableCell>
                        {stats ? (
                          <div>
                            <span
                              css={{ color: "#0000FF", fontWeight: "bold" }}
                            >
                              {stats.totalScore}
                            </span>
                            {stats.totalWrongAttempts > 0 && (
                              <span css={{ color: "red" }}>
                                {" (" + stats.totalWrongAttempts + ")"}
                              </span>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      {problems.map((problem) => (
                        <TableCell
                          key={`${problem.contestId}-${problem.index}`}
                        >
                          <Score problem={problem} stats={stats} />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

type ScoreProps = {
  problem: Problem;
  stats: UserStats | null;
};

const Score: React.FC<ScoreProps> = (props: ScoreProps) => {
  const { problem, stats } = props;

  const key = `${problem.contestId}-${problem.index}`;
  const problemStat = stats?.problemStats[key];

  const minutes = Math.floor((problemStat?.timeToFirstAC ?? 0) / 60);
  const remainingSeconds = (problemStat?.timeToFirstAC ?? 0) % 60;

  if (!problemStat) {
    return <div css={{ color: "gray" }}>-</div>;
  }

  if (
    problemStat.wrongAttemptBeforeAC === 0 &&
    problemStat.timeToFirstAC === null
  ) {
    return <div css={{ color: "gray" }}>-</div>;
  }

  if (
    problemStat.wrongAttemptBeforeAC > 0 &&
    problemStat.timeToFirstAC === null
  ) {
    return (
      <div css={{ color: "red" }}>({problemStat.wrongAttemptBeforeAC})</div>
    );
  }

  return (
    <div>
      <div>
        <span css={{ color: "#05AA3E", fontWeight: "bold" }}>
          {problemStat.score}
        </span>
        <span css={{ color: "red" }}>
          {problemStat.wrongAttemptBeforeAC > 0 && (
            <span> ({problemStat.wrongAttemptBeforeAC})</span>
          )}
        </span>
        <div css={{ color: "gray" }}>
          {minutes + ":" + remainingSeconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};
