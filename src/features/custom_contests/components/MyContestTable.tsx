import dayjs from "dayjs";
import React from "react";
import { NavLink } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Timer } from "@features/ui/component/Timer";
import { Chip_ } from "@features/ui/component/Chip";
import { TablePagination } from "@features/ui/component/TablePagination";
import { usePagination } from "@hooks/index";
import { utcISOStringToLocal } from "@helpers/date";
import { useFetchMyCustomContests } from "@features/custom_contests/hooks/useFetchMyCustomContests";
import { judgeContestType } from "@features/custom_contests/utils/judgeContestType";

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

  return (
    <>
      <Typography variant="h6">Created Contests</Typography>
      {data && (
        <>
          <TablePagination
            size={createdContestsLen}
            page={createdPage}
            setPage={createdSetPage}
            rowsPerPage={createdRowsPerPage}
            setRowsPerPage={createdSetRowsPerPage}
          />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Owner</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Start</TableCell>
                    <TableCell align="center">End</TableCell>
                    <TableCell align="center">Length</TableCell>
                    <TableCell align="center">State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createdContests
                    .slice(
                      createdPage * createdRowsPerPage,
                      (createdPage + 1) * createdRowsPerPage
                    )
                    .map((contest) => {
                      const length = dayjs(
                        utcISOStringToLocal(contest.endDate)
                      ).diff(utcISOStringToLocal(contest.startDate), "minutes");

                      const daysToStart = dayjs(
                        utcISOStringToLocal(contest.startDate)
                      ).diff(dayjs(), "days");

                      return (
                        <TableRow hover>
                          <TableCell>
                            <NavLink
                              to={`/custom-contest/show/${contest.contestId}`}
                            >
                              {contest.title}
                            </NavLink>
                            <Chip_ label={contest.visibility} />
                          </TableCell>
                          <TableCell>{contest.owner}</TableCell>
                          <TableCell>{contest.description}</TableCell>
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
                            <Chip_ label={judgeContestType(contest)} />
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
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}

      <Typography variant="h6">Joined Contests</Typography>
      {data && (
        <>
          <TablePagination
            size={participatedContestsLen}
            page={participatedPage}
            setPage={participatedSetPage}
            rowsPerPage={participatedRowsPerPage}
            setRowsPerPage={participatedSetRowsPerPage}
          />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Owner</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Start</TableCell>
                    <TableCell align="center">End</TableCell>
                    <TableCell align="center">Length</TableCell>
                    <TableCell align="center">State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participatedContests
                    .slice(
                      participatedPage * participatedRowsPerPage,
                      (participatedPage + 1) * participatedRowsPerPage
                    )
                    .map((contest) => {
                      const length = dayjs(
                        utcISOStringToLocal(contest.endDate)
                      ).diff(utcISOStringToLocal(contest.startDate), "minutes");

                      const daysToStart = dayjs(
                        utcISOStringToLocal(contest.startDate)
                      ).diff(dayjs(), "days");

                      return (
                        <TableRow hover>
                          <TableCell>
                            <NavLink
                              to={`/custom-contest/show/${contest.contestId}`}
                            >
                              {contest.title}
                            </NavLink>
                            <Chip_ label={contest.visibility} />
                          </TableCell>
                          <TableCell>{contest.owner}</TableCell>
                          <TableCell>{contest.description}</TableCell>
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
                            <Chip_ label={judgeContestType(contest)} />
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
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </>
  );
};
