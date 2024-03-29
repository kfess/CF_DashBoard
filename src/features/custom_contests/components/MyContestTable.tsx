import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material";
import { Timer } from "@features/ui/component/Timer";
import { Chip } from "@features/ui/component/Chip";
import { TablePagination } from "@features/ui/component/TablePagination";
import { usePagination } from "@hooks/index";
import { utcISOStringToLocal } from "@helpers/date";
import { useFetchMyCustomContests } from "@features/custom_contests/hooks/useFetchMyCustomContests";
import { judgeContestType } from "@features/custom_contests/utils/judgeContestType";
import { InternalLink } from "@features/ui/component/InternalLink";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

export const MyContestTable: React.FC = () => {
  const { data } = useFetchMyCustomContests();
  const createdContests = data?.createdContests ?? [];
  const participatedContests = data?.participatedContests ?? [];

  const createdContestsLen = createdContests.length ?? 0;
  const participatedContestsLen = participatedContests.length ?? 0;

  const [
    createdPage,
    createdSetPage,
    createdRowsPerPage,
    createdSetRowsPerPage,
  ] = usePagination(10);

  const [
    participatedPage,
    participatedSetPage,
    participatedRowsPerPage,
    participatedSetRowsPerPage,
  ] = usePagination(10);

  const [usertimeZone] = useLocalStorage("timezone", dayjs.tz.guess());

  return (
    <>
      <Typography variant="h4">Created Contests</Typography>
      {data && (
        <>
          <TablePagination
            size={createdContestsLen}
            page={createdPage}
            setPage={createdSetPage}
            rowsPerPage={createdRowsPerPage}
            setRowsPerPage={createdSetRowsPerPage}
          />
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
            }}
            elevation={0}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Related Tags</TableCell>
                    <TableCell align="center">Start</TableCell>
                    <TableCell align="center">End</TableCell>
                    <TableCell align="center">Length</TableCell>
                    <TableCell align="center">State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createdContests.length > 0 &&
                    createdContests
                      .sort((a, b) => b.startDate.localeCompare(a.startDate))
                      .slice(
                        createdPage * createdRowsPerPage,
                        (createdPage + 1) * createdRowsPerPage
                      )
                      .map((contest) => {
                        const length = dayjs(
                          utcISOStringToLocal(contest.endDate)
                        ).diff(
                          utcISOStringToLocal(contest.startDate),
                          "minutes"
                        );

                        const daysToStart = dayjs(
                          utcISOStringToLocal(contest.startDate)
                        ).diff(dayjs(), "days");

                        return (
                          <TableRow hover key={contest.contestId}>
                            <TableCell>
                              <Stack direction="row" spacing={0.5}>
                                <InternalLink
                                  to={`/custom-contest/show/${contest.contestId}`}
                                  title={contest.title}
                                />
                                <Chip
                                  label={contest.visibility}
                                  sx={{
                                    color: "#9246FF",
                                    borderColor: "black",
                                    backgroundColor: alpha("#9246FF", 0.15),
                                  }}
                                />
                              </Stack>
                            </TableCell>
                            <TableCell>{contest.description}</TableCell>
                            <TableCell>
                              <Stack
                                direction="row"
                                gap={1}
                                sx={{ overflow: "auto" }}
                              >
                                {contest.relatedTopics.map((topic) => (
                                  <Chip key={topic} label={topic} />
                                ))}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              {utcISOStringToLocal(contest.startDate)}
                            </TableCell>
                            <TableCell>
                              {utcISOStringToLocal(contest.endDate)}
                            </TableCell>
                            <TableCell>
                              {Math.floor(length / 60)
                                .toString()
                                .padStart(2, "0")}
                              :{(length % 60).toString().padStart(2, "0")}
                            </TableCell>
                            <TableCell>
                              <Stack
                                direction="column"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <Chip
                                  label={judgeContestType(contest)}
                                  sx={{
                                    color:
                                      judgeContestType(contest) === "Running"
                                        ? "#9246FF"
                                        : "",
                                    backgroundColor:
                                      judgeContestType(contest) === "Running"
                                        ? alpha("#9246FF", 0.15)
                                        : "",
                                  }}
                                />
                                {judgeContestType(contest) === "Running" && (
                                  <Timer toDate={contest.endDate} />
                                )}
                                {judgeContestType(contest) === "Upcoming" && (
                                  <>
                                    <div>Before Start</div>
                                    <div>
                                      {daysToStart > 1 && (
                                        <span>{daysToStart} days</span>
                                      )}
                                      {daysToStart === 1 && (
                                        <span>{daysToStart} day</span>
                                      )}
                                      {daysToStart === 0 && (
                                        <Timer toDate={contest.endDate} />
                                      )}
                                    </div>
                                  </>
                                )}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {createdContestsLen === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No created contests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
      <Divider sx={{ mt: 3, mb: 2 }} />
      <Typography variant="h4">Joined Contests</Typography>
      {data && (
        <>
          <TablePagination
            size={participatedContestsLen}
            page={participatedPage}
            setPage={participatedSetPage}
            rowsPerPage={participatedRowsPerPage}
            setRowsPerPage={participatedSetRowsPerPage}
          />
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
            }}
            elevation={0}
          >
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Owner</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Related Tags</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Box component="span">Start</Box>
                        <HelpToolTip title={`Time Zone: ${usertimeZone}`} />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Box component="span">End</Box>
                        <HelpToolTip title={`Time Zone: ${usertimeZone}`} />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">Length</TableCell>
                    <TableCell align="center">State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participatedContests.length > 0 &&
                    participatedContests
                      .sort((a, b) => b.startDate.localeCompare(a.startDate))
                      .slice(
                        participatedPage * participatedRowsPerPage,
                        (participatedPage + 1) * participatedRowsPerPage
                      )
                      .map((contest) => {
                        const length = dayjs(
                          utcISOStringToLocal(contest.endDate)
                        ).diff(
                          utcISOStringToLocal(contest.startDate),
                          "minutes"
                        );

                        const daysToStart = dayjs(
                          utcISOStringToLocal(contest.startDate)
                        ).diff(dayjs(), "days");

                        return (
                          <TableRow hover key={contest.contestId}>
                            <TableCell>
                              <Stack direction="row" spacing={0.5}>
                                <InternalLink
                                  to={`/custom-contest/show/${contest.contestId}`}
                                  title={contest.title}
                                />
                                <Chip
                                  label={contest.visibility}
                                  sx={{
                                    color: "#9246FF",
                                    borderColor: "black",
                                    backgroundColor: alpha("#9246FF", 0.15),
                                  }}
                                />
                              </Stack>
                            </TableCell>
                            <TableCell>{contest.owner}</TableCell>
                            <TableCell>{contest.description}</TableCell>
                            <TableCell>
                              <Stack
                                direction="row"
                                gap={1}
                                sx={{ overflow: "auto" }}
                              >
                                {contest.relatedTopics.map((topic) => (
                                  <Chip key={topic} label={topic} />
                                ))}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              {utcISOStringToLocal(contest.startDate)}
                            </TableCell>
                            <TableCell>
                              {utcISOStringToLocal(contest.endDate)}
                            </TableCell>
                            <TableCell>
                              {Math.floor(length / 60)
                                .toString()
                                .padStart(2, "0")}
                              :{(length % 60).toString().padStart(2, "0")}
                            </TableCell>
                            <TableCell>
                              <Stack
                                direction="column"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <Chip
                                  label={judgeContestType(contest)}
                                  sx={{
                                    color:
                                      judgeContestType(contest) === "Running"
                                        ? "#9246FF"
                                        : "",
                                    backgroundColor:
                                      judgeContestType(contest) === "Running"
                                        ? alpha("#9246FF", 0.15)
                                        : "",
                                  }}
                                />
                                {judgeContestType(contest) === "Running" && (
                                  <Timer toDate={contest.endDate} />
                                )}
                                {judgeContestType(contest) === "Upcoming" && (
                                  <>
                                    <div>Before Start</div>
                                    <div>
                                      {daysToStart > 1 && (
                                        <span>{daysToStart} days</span>
                                      )}
                                      {daysToStart === 1 && (
                                        <span>{daysToStart} day</span>
                                      )}
                                      {daysToStart === 0 && (
                                        <Timer toDate={contest.endDate} />
                                      )}
                                    </div>
                                  </>
                                )}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {participatedContestsLen === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No participated contests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </>
  );
};
