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
  calculateSolverCount,
} from "@features/custom_contests/utils/calculateStandings";
import { CF_CONTEST_URL, CF_PROFILE_URL } from "@constants/url";
import { getProblemKey } from "@features/problems/utils";
import { secondsToHms } from "@helpers/date";
import { pluralize } from "@helpers/format";
import { ExternalLink } from "@features/ui/component/ExternalLink";

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

  const solvedCount = useMemo(() => {
    return calculateSolverCount(submissionsByUser || {}, problems);
  }, [submissionsByUser]);

  return (
    <>
      <Typography variant="subtitle1" component="div" gutterBottom>
        {numParticipants} {pluralize(numParticipants, "user")}{" "}
        {numParticipants > 1 ? "are " : "is "}
        participating in this contest.
      </Typography>
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
                <TableCell
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    textAlign: "center",
                    fontWeight: "600",
                    padding: "0px",
                  }}
                >
                  rank
                </TableCell>
                <TableCell
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    textAlign: "center",
                    fontWeight: "600",
                    padding: "0px",
                  }}
                >
                  Participants
                </TableCell>
                <TableCell
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    textAlign: "center",
                    fontWeight: "600",
                    padding: "0px",
                  }}
                >
                  Score
                </TableCell>
                {problems.map((problem, idx) => (
                  <TableCell
                    key={getProblemKey(problem)}
                    sx={{
                      border: (theme) => `0.5px solid ${theme.palette.divider}`,
                      textAlign: "center",
                      padding: "0px",
                    }}
                  >
                    <ExternalLink
                      href={`${CF_CONTEST_URL}/${problem.contestId}/problem/${problem.index}`}
                      label={idx + 1}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {problem.rating}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {participants
                .sort((a, b) => {
                  const aStats = userStats[a] || null;
                  const bStats = userStats[b] || null;
                  if (!aStats || !bStats) {
                    return 0;
                  }
                  if (bStats.totalScore > aStats.totalScore) {
                    return 1;
                  }
                  return bStats.totalWrongAttempts - aStats.totalWrongAttempts;
                })
                .map((participant, i) => {
                  const stats = userStats[participant] || null;
                  return (
                    <TableRow hover key={participant}>
                      <TableCell
                        sx={{
                          border: (theme) =>
                            `0.5px solid ${theme.palette.divider}`,
                          textAlign: "center",
                          padding: "2px",
                        }}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: (theme) =>
                            `0.5px solid ${theme.palette.divider}`,
                          padding: "8px",
                        }}
                      >
                        <Typography variant="body1" fontWeight="fontWeightBold">
                          <ExternalLink
                            href={`${CF_PROFILE_URL}/${participant}`}
                            label={participant}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: (theme) =>
                            `0.5px solid ${theme.palette.divider}`,
                          padding: "2px",
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
                          key={getProblemKey(problem)}
                          sx={{
                            border: (theme) =>
                              `0.5px solid ${theme.palette.divider}`,
                            padding: "2px",
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
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    padding: "8px",
                  }}
                >
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    First Acceptance
                  </Typography>
                </TableCell>
                {problems.map((problem) => {
                  const key = getProblemKey(problem);
                  return (
                    <TableCell
                      key={key}
                      sx={{
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        padding: "8px",
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
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                        >
                          -
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    padding: "8px",
                  }}
                >
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Solvers
                  </Typography>
                </TableCell>
                {problems.map((problem) => {
                  const key = getProblemKey(problem);
                  return (
                    <TableCell
                      key={key}
                      sx={{
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        padding: "8px",
                      }}
                    >
                      <Typography variant="body2" sx={{ textAlign: "center" }}>
                        {solvedCount[key]["totalSolvers"].size} /{" "}
                        {solvedCount[key]["totalSubmitters"].size}
                      </Typography>
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
  const key = getProblemKey(problem);
  const problemStat = stats?.problemStats[key];

  const actime =
    problemStat && problemStat?.timeToFirstAC
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
