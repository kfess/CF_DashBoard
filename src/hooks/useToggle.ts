import { useState, useCallback } from "react";

export const useToggle = <T>(initialValue: T, alternativeValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  const toggle = useCallback(() => {
    setState((prevState) =>
      prevState === initialValue ? alternativeValue : initialValue
    );
  }, [initialValue, alternativeValue]);

  return [state, toggle, setState] as const;
};
