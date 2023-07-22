import React from "react";
import { TablePagination as MUITablePagination } from "@mui/material";

type Props = {
  size: number;
  page: number;
  setPage: (arg: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (arg: number) => void;
};

export const TablePagination: React.FC<Props> = (props: Props) => {
  const { size, page, setPage, rowsPerPage, setRowsPerPage } = props;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MUITablePagination
      component="div"
      count={size}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[10, 20, 50]}
    />
  );
};
