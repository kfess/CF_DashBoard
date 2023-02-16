import { useState, useCallback } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [state, setState] = useState<boolean>(initialValue);
  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, [state]);

  return [state, toggle] as const;
};

export const usePagination = (initialValue: number = 50) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialValue);

  return [page, setPage, rowsPerPage, setRowsPerPage] as const;
};
