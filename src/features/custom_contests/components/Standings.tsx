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
  calculateFirstACs,
} from "@features/custom_contests/utils/calculateStandings";
import { CF_CONTEST_URL, CF_PROFILE_URL } from "@constants/url";
import { getProblemKey } from "@features/problems/utils";
import { secondsToHms } from "@helpers/date";
import { pluralize } from "@helpers/format";

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

  const { submissionsByUser } = useFetchSubmissions(
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
  }, [submissionsByUser]);

  const firstACs = useMemo(() => {
    if (!submissionsByUser) {
      return {};
    }
    const allSubmissions = Object.values(submissionsByUser).flat();
    return calculateFirstACs(allSubmissions, startDate);
  }, [submissionsByUser]);

  return (
    <>
      <Typography variant="h6" component="div" gutterBottom>
        {numParticipants} {pluralize(numParticipants, "user")} are participating
        in this contest.
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
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "2px solid rgba(224, 224, 224, 1)",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Participants
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "2px solid rgba(224, 224, 224, 1)",
                    textAlign: "center",
                    fontWeight: "600",
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
                      textAlign: "center",
                    }}
                  >
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`${CF_CONTEST_URL}/${problem.contestId}/problem/${problem.index}`}
                    >
                      {idx + 1}
                    </a>

                    <Typography variant="body2" color="text.secondary">
                      {problem.rating}
                    </Typography>
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
                        textAlign: "center",
                      }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <Typography variant="body1" fontWeight="fontWeightBold">
                        <a
                          href={`${CF_PROFILE_URL}/${participant}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          css={{
                            textDecoration: "none",
                          }}
                        >
                          {participant}
                        </a>
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {stats ? (
                        <>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography
                              variant="body1"
                              fontWeight="fontWeightBold"
                              css={{ color: "#05AA02" }}
                            >
                              {stats.totalScore}
                            </Typography>
                            {stats.totalWrongAttempts > 0 && (
                              <Typography
                                variant="body1"
                                css={{ marginLeft: "6px", color: "red" }}
                              >
                                {"(" + stats.totalWrongAttempts + ")"}
                              </Typography>
                            )}
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            css={{
                              textAlign: "center",
                            }}
                          >
                            {stats.lastACTime
                              ? secondsToHms(stats.lastACTime)
                              : "-"}
                          </Typography>
                        </>
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
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightBold"
                    sx={{ textAlign: "center" }}
                  >
                    First Acceptance
                  </Typography>
                </TableCell>
                {problems.map((problem) => {
                  const key = getProblemKey(
                    problem.contestId,
                    problem.index,
                    problem.name
                  );
                  return (
                    <TableCell
                      key={key}
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {firstACs[key] ? (
                        <>
                          <Typography
                            variant="body1"
                            color="success.main"
                            fontWeight="fontWeightBold"
                            sx={{ textAlign: "center", color: "#05AA02" }}
                          >
                            {firstACs[key].user}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight="fontWeightBold"
                            sx={{ textAlign: "center" }}
                          >
                            {secondsToHms(firstACs[key].time)}
                          </Typography>
                        </>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
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
    (problemStat.wrongAttemptBeforeAC === 0 && !problemStat.timeToFirstAC)
  ) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
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
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="body1"
          css={{ color: "#05AA02" }}
          fontWeight="fontWeightBold"
        >
          {problemStat.score}
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginLeft: "6px", textAlign: "center", color: "red" }}
        >
          {failedAttempts}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        {actime}
      </Typography>
    </Box>
  );
};
