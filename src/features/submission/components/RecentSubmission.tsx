import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { useFetchRecentSubmissions } from "@features/submission/hooks/useFetchSubmission";
import { formatUnixTime } from "@helpers/date";
import { useContestIdNameMap } from "@features/contests/hooks/useFetchContest";
import { TablePagination } from "@features/ui/component/TablePagination";
import { VerdictChip } from "@features/submission/components/VerdictChip";
import { usePagination } from "@hooks/usePagination";
import { ExternalLink } from "@features/ui/component/ExternalLink";
import { Chip } from "@features/ui/component/Chip";

export const RecentSubmission: React.FC = () => {
  const { data } = useFetchRecentSubmissions();
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(data);

  const { contestIdNameMap } = useContestIdNameMap();

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
          <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  border: (theme) => `0.5px solid ${theme.palette.divider}`,
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        Contest
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        Problem
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        User
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        Language
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="fontWeightBold">
                        Detail
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...data]
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((d) => (
                      <TableRow key={d.id}>
                        <TableCell>
                          {formatUnixTime(d.creationTimeSeconds)}
                        </TableCell>
                        <TableCell>
                          <ContestLink
                            contestId={d.contestId as number}
                            contestName={
                              contestIdNameMap[d.contestId as number]
                            }
                            showBookmarked={false}
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
                            solvedCount={d.problem.solvedCount}
                            showBookmarked={false}
                          />
                        </TableCell>
                        <TableCell>
                          <ExternalLink
                            href={`https://codeforces.com/profile/${d.author.members[0].handle}`}
                            label={d.author.members[0].handle}
                          />
                        </TableCell>
                        <TableCell>
                          <VerdictChip verdict={d.verdict} />
                        </TableCell>
                        <TableCell>
                          <Chip label={d.programmingLanguage} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            <ExternalLink
                              href={`https://codeforces.com/contest/${d.contestId}/submission/${d.id}`}
                              label="detail"
                            />
                          </Typography>
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
