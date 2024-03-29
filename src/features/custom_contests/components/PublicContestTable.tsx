import dayjs from "dayjs";
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { CreatedContestType } from "@features/custom_contests/customContest";
import { useFetchAllCustomContests } from "@features/custom_contests/hooks/useFetchAllCustomContests";
import { TablePagination } from "@features/ui/component/TablePagination";
import { usePagination } from "@hooks/index";
import { RunningContestTableRow } from "@features/custom_contests/components/RunningContestTableRow";
import { UpcomingContestTableRow } from "./UpcomingContestTableRow";
import { FinishedContestTableRow } from "./FinishedContestTableRow";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

type Props = { contestType: CreatedContestType };

export const PublicContestTable: React.FC<Props> = ({ contestType }) => {
  const { data } = useFetchAllCustomContests();
  const [usertimeZone] = useLocalStorage("timezone", dayjs.tz.guess());

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(10);

  const customContests = data?.filter((d) => {
    if (contestType === "Finished") {
      return dayjs().isAfter(dayjs(d.endDate));
    } else if (contestType === "Running") {
      return (
        dayjs().isAfter(dayjs(d.startDate)) &&
        dayjs().isBefore(dayjs(d.endDate))
      );
    } else if (contestType === "Upcoming") {
      return dayjs().isBefore(dayjs(d.startDate));
    }
  });

  const contestsLen = customContests?.length ?? 0;

  return (
    <>
      <TablePagination
        size={contestsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
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
                {contestType === "Running" && (
                  <>
                    <TableCell align="center">Remaining Time</TableCell>
                    <TableCell align="center">Registration</TableCell>
                  </>
                )}
                {contestType === "Upcoming" && (
                  <>
                    <TableCell align="center">Days to Start</TableCell>
                    <TableCell align="center">Registration</TableCell>
                  </>
                )}
                {contestType === "Finished" && (
                  <>
                    <TableCell align="center">Final Standings</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            {contestsLen > 0 ? (
              <TableBody>
                {customContests?.map((customContest) => {
                  switch (contestType) {
                    case "Running":
                      return (
                        <RunningContestTableRow
                          key={customContest.contestId}
                          customContest={customContest}
                          timeZone={usertimeZone}
                        />
                      );
                    case "Upcoming":
                      return (
                        <UpcomingContestTableRow
                          key={customContest.contestId}
                          customContest={customContest}
                          timeZone={usertimeZone}
                        />
                      );
                    case "Finished":
                      return (
                        <FinishedContestTableRow
                          key={customContest.contestId}
                          customContest={customContest}
                          timeZone={usertimeZone}
                        />
                      );
                  }
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={9}>
                    <NoDataMessage
                      title="No Custom Contest Found"
                      message={
                        <>
                          There are no custom contests available. <br />
                          You can create a new custom contest by clicking on the
                          &quot;Create New Contest&quot; button.
                        </>
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
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
