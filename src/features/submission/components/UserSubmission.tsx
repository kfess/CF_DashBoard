import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { formatUnixTime } from "@helpers/date";
import { TablePagination } from "@features/ui/component/TablePagination";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { VerdictChip } from "@features/submission/components/VerdictChip";
import { verdictMap } from "@helpers/verdict";
import { VerdictFilter } from "./SolvedStatusFilter";
import { LanguageFilter } from "./LanguageFilter";
import { usePagination } from "@hooks/index";
import { useContestIdNameMap } from "@features/contests/hooks/useFetchContest";
import { Classification } from "@features/contests/contest";
import { getClassification } from "@features/contests/utils/getClassification";

type Props = {
  readonly userId: string;
  readonly classification: Classification;
  readonly solvedStatus: VerdictFilter;
  readonly language: LanguageFilter;
};

export const UserSubmission: React.FC<Props> = ({
  userId,
  classification,
  solvedStatus,
  language,
}) => {
  const { data } = useFetchUserSubmission({
    userId: userId,
  });

  const { contestIdNameMap } = useContestIdNameMap();

  const filteredData = useMemo(() => {
    return data?.filter((d) => {
      const contestClassification = getClassification(
        contestIdNameMap[d.contestId as number] ?? ""
      );
      const verdictStatus = verdictMap[d.verdict ?? "UNKNOWN"];

      return (
        (classification === "All" ||
          classification === contestClassification) &&
        (solvedStatus === "All" || solvedStatus === verdictStatus) &&
        (language === "All" || language === d.programmingLanguage)
      );
    });
  }, [data, contestIdNameMap, classification, solvedStatus, language]);

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();

  return (
    <>
      {filteredData && (
        <>
          <TablePagination
            size={filteredData.length}
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
                {filteredData.length > 0 ? (
                  <TableBody>
                    {filteredData
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((d) => (
                        <TableRow key={d.id} hover>
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
                              solvedCount={d.problem.solvedCount}
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
                          <TableCell>{d.programmingLanguage}</TableCell>
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
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7}>
                        There is no Data to display.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Paper>
          <TablePagination
            size={filteredData.length}
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
