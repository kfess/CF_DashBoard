import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Problem } from "@features/problems/problem";
import { useFetchSubmissions } from "@features/custom_contests/hooks/useFetchSubmissions";
import { useToggle } from "@hooks/index";
import {
  UserStats,
  calculateAllUsersStats,
} from "@features/custom_contests/utils/calculateStandings";
import { CF_CONTEST_URL } from "@constants/url";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { getProblemKey } from "@features/problems/utils";
import { secondsToHms } from "@helpers/date";

type Props = {
  readonly participants: string[];
  readonly problems: Problem[];
  readonly startDate: string;
  readonly endDate: string;
  readonly penalty: number;
};

// 各ユーザーのサブミッション状況は、codeforces API を直接叩いて取得する。

export const Standings: React.FC<Props> = ({
  problems,
  participants,
  startDate,
  endDate,
  penalty,
}) => {
  const numParticipants = participants.length;

  const [autoRefetch, toggleAutoRefetch] = useToggle(false, true);

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
      <Typography variant="h6" component="div" gutterBottom>
        {numParticipants} people participated
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "2px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "2px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Participants
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "2px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Score
                </TableCell>
                {problems.map((problem, idx) => (
                  <TableCell
                    key={getProblemKey(
                      problem.contestId,
                      problem.index,
                      problem.name
                    )}
                    sx={{
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                      borderBottom: "2px solid rgba(224, 224, 224, 1)",
                    }}
                  >
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
              {participants.map((participant, i) => {
                const stats = userStats[participant] || null;
                return (
                  <TableRow hover key={participant}>
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {participant}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {stats ? (
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="body1"
                            color="success.main"
                            fontWeight="fontWeightBold"
                          >
                            {stats.totalScore}
                          </Typography>
                          {stats.totalWrongAttempts > 0 && (
                            <Typography
                              variant="body1"
                              color="error.main"
                              css={{ marginLeft: "6px" }}
                            >
                              {"(" + stats.totalWrongAttempts + ")"}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                    {problems.map((problem) => (
                      <TableCell
                        key={getProblemKey(
                          problem.contestId,
                          problem.index,
                          problem.name
                        )}
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
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
  readonly problem: Problem;
  readonly stats: UserStats | null;
};

const Score: React.FC<ScoreProps> = ({ problem, stats }) => {
  const key = getProblemKey(problem.contestId, problem.index, problem.name);
  const problemStat = stats?.problemStats[key];

  const actime = problemStat?.timeToFirstAC
    ? secondsToHms(problemStat?.timeToFirstAC)
    : null;

  if (
    !problemStat ||
    (problemStat.wrongAttemptBeforeAC === 0 &&
      problemStat.timeToFirstAC === null)
  ) {
    return (
      <Typography variant="body2" color="text.secondary">
        -
      </Typography>
    );
  }

  const failedAttempts =
    problemStat.wrongAttemptBeforeAC > 0
      ? `(${problemStat.wrongAttemptBeforeAC})`
      : "";

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography
          variant="body1"
          color="success.main"
          fontWeight="fontWeightBold"
        >
          {problemStat.score}
        </Typography>
        <Typography
          variant="body1"
          color="error.main"
          sx={{ marginLeft: "6px" }}
        >
          {failedAttempts}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {actime}
      </Typography>
    </Box>
  );
};
