import { DependencyList, useEffect } from "react";
import useTimeoutFn from "@hooks/useTimeoutFn";

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(
  fn: Function, // eslint-disable-line
  ms: number = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
