import { useState, useCallback } from "react";

export const useToggle = <T>(initialValue: T, alternativeValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  const toggle = useCallback(() => {
    setState((prevState) =>
      prevState === initialValue ? alternativeValue : initialValue
    );
  }, [initialValue, alternativeValue]);

  return [state, toggle] as const;
};

export const usePagination = (initialValue: number = 50) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialValue);

  return [page, setPage, rowsPerPage, setRowsPerPage] as const;
};
