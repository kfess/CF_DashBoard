import React, { useMemo } from "react";
import { alpha } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useToggle } from "@hooks/index";
import { CF_CONTEST_URL, CF_GYM_URL, CF_PROFILE_URL } from "@constants/url";
import { useFetchSubmissions } from "@features/custom_contests/hooks/useFetchSubmissions";
import type { Problem } from "@features/problems/problem";
import { pluralize } from "@helpers/format";
import { getProblemKey } from "@features/problems/utils";
import { calculateAllUsersStats } from "@features/custom_contests/utils/calculateTrainingStandings";
import { Chip } from "@features/ui/component/Chip";
import { ExternalLink } from "@features/ui/component/ExternalLink";

const BLOCK_WIDTH = 14;

type Props = {
  participants: string[];
  problems: Problem[];
  startDate: string;
  endDate: string;
};

export const TrainingStandings: React.FC<Props> = ({
  participants,
  problems,
  startDate,
  endDate,
}) => {
  const numParticipants = participants.length;
  const numProblems = problems.length;
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
    return calculateAllUsersStats(submissionsByUser, problems);
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
                  }}
                >
                  rank
                </TableCell>
                <TableCell
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Participants
                </TableCell>
                <TableCell
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Score
                </TableCell>
                <TableCell
                  sx={{
                    border: (theme) => `0.5px solid ${theme.palette.divider}`,
                    textAlign: "center",
                    fontWeight: "600",
                    padding: "0px",
                  }}
                >
                  Progress
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant, i) => {
                return (
                  <TableRow hover key={participant}>
                    <TableCell
                      sx={{
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        padding: "6px",
                      }}
                    >
                      <ExternalLink
                        href={`${CF_PROFILE_URL}/${participant}`}
                        label={participant}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        textAlign: "center",
                        padding: "2px",
                      }}
                    >
                      <Chip
                        label={`${userStats[participant].totalScore} / ${numProblems}`}
                        sx={{
                          color: (theme) => theme.palette.primary.dark,
                          backgroundColor: (theme) =>
                            alpha(theme.palette.primary.light, 0.2),
                          "&:hover": {
                            backgroundColor: (theme) =>
                              alpha(theme.palette.primary.main, 0.25),
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        padding: "8px",
                      }}
                    >
                      <svg
                        width={problems.length * (BLOCK_WIDTH + 2)}
                        height={BLOCK_WIDTH}
                      >
                        {problems.map((problem, j) => {
                          const key = getProblemKey(problem);
                          const isAC =
                            userStats[participant].solvedSet.has(key);
                          const isAttempted =
                            userStats[participant].attemptedSet.has(key);
                          return (
                            <Tooltip
                              key={key}
                              title={problem.index + "." + problem.name}
                              arrow
                              enterTouchDelay={0}
                            >
                              <ExternalLink
                                href={`${
                                  problem.contestId! >= 100001
                                    ? CF_GYM_URL
                                    : CF_CONTEST_URL
                                }/${problem.contestId}/problem/${
                                  problem.index
                                }`}
                                label={
                                  <rect
                                    x={j * (BLOCK_WIDTH + 1)}
                                    y={0}
                                    width={BLOCK_WIDTH}
                                    height={BLOCK_WIDTH}
                                    fill={
                                      isAC
                                        ? "#4caf50"
                                        : isAttempted
                                        ? "#EFA41C"
                                        : "#e0e0e0"
                                    }
                                  />
                                }
                              />
                            </Tooltip>
                          );
                        })}
                      </svg>
                    </TableCell>
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
