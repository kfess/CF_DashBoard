import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { formatUnixTime } from "@helpers/date";
import { TablePagination } from "@features/ui/component/TablePagination";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { VerdictChip } from "@features/submission/components/VerdictChip";
import { VerdictFilter } from "../submission";
import { verdicts } from "../submission";
import { LanguageFilter } from "./LanguageFilter";
import { usePagination } from "@hooks/usePagination";
import { useContestIdNameMap } from "@features/contests/hooks/useFetchContest";
import { Classification } from "@features/contests/contest";
import { getClassification } from "@features/contests/utils/getClassification";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { Link } from "@features/ui/component/Link";

type Props = {
  readonly userId: string;
  readonly classification: Classification;
  readonly verdictStatus: VerdictFilter;
  readonly language: LanguageFilter;
};

export const UserSubmission: React.FC<Props> = ({
  userId,
  classification,
  verdictStatus,
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
      const v = verdicts[d.verdict ?? "UNKNOWN"];

      return (
        (classification === "All" ||
          classification === contestClassification) &&
        (verdictStatus === "All" || verdictStatus === v) &&
        (language === "All" || language === d.programmingLanguage)
      );
    });
  }, [data, contestIdNameMap, classification, verdictStatus, language]);

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(data);

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
              <Table stickyHeader>
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
                              classification={classification}
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
                            <Typography variant="body2">
                              <Link
                                href={`https://codeforces.com/profile/${d.author.members[0].handle}`}
                                label={d.author.members[0].handle}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <VerdictChip verdict={d.verdict} />
                          </TableCell>
                          <TableCell>{d.programmingLanguage}</TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              <Link
                                href={`https://codeforces.com/contest/${d.contestId}/submission/${d.id}`}
                                label="detail"
                              />
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <NoDataMessage
                          title="No Submissions Found"
                          message="Please check your filter options."
                        />
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
