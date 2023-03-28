import { useState } from "react";

export const usePagination = (initialValue: number = 50) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialValue);

  return [page, setPage, rowsPerPage, setRowsPerPage] as const;
};
