import { useState, useEffect } from "react";

export const usePagination = (resetKey: any, initialValue: number = 50) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialValue);

  useEffect(() => {
    setPage(0);
  }, [resetKey]);

  return [page, setPage, rowsPerPage, setRowsPerPage] as const;
};
