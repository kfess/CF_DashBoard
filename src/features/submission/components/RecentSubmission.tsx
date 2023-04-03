import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { useFetchRecentSubmissions } from "../useFetchSubmission";
import { normalizeLanguage } from "@features/language/language";
import { formatUnixTime } from "@helpers/index";
import { useOfficialContestIdNameMap } from "@features/contests/hooks/useFetchOfficialContest";
import { TablePagination } from "@features/ui/component/TablePagination";
import { VerdictChip } from "@features/submission/components/VerdictChip";
import { usePagination } from "@hooks/index";
import { CircularProgress } from "@features/ui/component/CircularProgress";

export const RecentSubmission: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchRecentSubmissions();
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();

  const { contestIdNameMap, isLoading: mapIsLoading } =
    useOfficialContestIdNameMap();

  if (isLoading || mapIsLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {data && (
        <>
          <TablePagination
            size={data.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Contest</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...data]
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((d) => (
                      <TableRow>
                        <TableCell>
                          {formatUnixTime(d.creationTimeSeconds)}
                        </TableCell>
                        <TableCell>
                          <ContestLink
                            contestId={d.contestId as number}
                            contestName={
                              contestIdNameMap[d.contestId as number]
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <ProblemLink
                            showDifficulty={true}
                            contestId={d.contestId as number} // need to fix this.
                            contestName={
                              contestIdNameMap[d.contestId as number]
                            }
                            problemId={d.problem.index}
                            problemName={d.problem.name}
                            difficulty={d.problem.rating}
                            // solvedCount={}
                          />
                        </TableCell>
                        <TableCell>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://codeforces.com/profile/${d.author.members[0].handle}`}
                          >
                            {d.author.members[0].handle}
                          </a>
                        </TableCell>
                        <TableCell>
                          <VerdictChip verdict={d.verdict} />
                        </TableCell>
                        <TableCell>
                          {normalizeLanguage(d.programmingLanguage)}
                        </TableCell>
                        <TableCell>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://codeforces.com/contest/${d.contestId}/submission/${d.id}`}
                          >
                            detail
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <TablePagination
            size={data.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </>
      )}
    </>
  );
};
