import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Problem } from "@features/problems/problem";
import { usePagination } from "@hooks/index";
import { TablePagination } from "@features/ui/component/TablePagination";
import { ProblemsTableRow } from "@features/problems/components/ProblemsTableRow";

type Props = {
  problems: Problem[];
};

export const ProblemsTable: React.FC<Props> = (props: Props) => {
  const { problems } = props;

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();
  const problemsLen = useMemo(() => problems.length, [problems]);

  return (
    <>
      <TablePagination
        size={problemsLen}
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
                <TableCell>Contest</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Solution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...problems]
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((problem) => (
                  <ProblemsTableRow problem={problem} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        size={problemsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};
