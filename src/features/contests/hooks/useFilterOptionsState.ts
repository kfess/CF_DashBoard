import { useReducer, useCallback } from "react";
import type { Classification } from "../contest";
import type { PeriodWord } from "../components/PeriodFilter";
import type { SolvedStatus } from "../components/SolvedStatusFilter";
import { useURLQuery } from "@hooks/useQueryParams";

export type FilterOptionsState = {
  classification: Classification;
  period: PeriodWord;
  solvedStatus: SolvedStatus;
  showDifficulty: boolean;
  reverse: boolean;
};

type FilterOptionsAction =
  | { type: "setClassification"; classification: Classification }
  | { type: "setPeriod"; period: PeriodWord }
  | { type: "setSolvedStatus"; solvedStatus: SolvedStatus }
  | { type: "toggleShowDifficulty" }
  | { type: "toggleReverse" }
  | { type: "reset" };

const initialState: FilterOptionsState = {
  classification: "All",
  period: "All Period",
  solvedStatus: "All Contests",
  showDifficulty: true,
  reverse: false,
};

const filterOptionsReducer = (
  state: FilterOptionsState,
  action: FilterOptionsAction
): FilterOptionsState => {
  switch (action.type) {
    case "setClassification":
      return { ...state, classification: action.classification };
    case "setPeriod":
      return { ...state, period: action.period };
    case "setSolvedStatus":
      return { ...state, solvedStatus: action.solvedStatus };
    case "toggleShowDifficulty":
      return { ...state, showDifficulty: !state.showDifficulty };
    case "toggleReverse":
      return { ...state, reverse: !state.reverse };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const useFilterOptionsState = () => {
  const { queryParams } = useURLQuery();

  const [state, dispatch] = useReducer(filterOptionsReducer, {
    classification: queryParams.classification || initialState.classification,
    period: queryParams.period || initialState.period,
    solvedStatus: queryParams.contestSolvedStatus || initialState.solvedStatus,
    showDifficulty: initialState.showDifficulty,
    reverse: initialState.reverse,
  }) as [FilterOptionsState, React.Dispatch<FilterOptionsAction>];

  const setClassification = (classification: Classification) =>
    dispatch({ type: "setClassification", classification });
  const setPeriod = (period: PeriodWord) =>
    dispatch({ type: "setPeriod", period });
  const setSolvedStatus = (solvedStatus: SolvedStatus) =>
    dispatch({ type: "setSolvedStatus", solvedStatus });
  const toggleShowDifficulty = () => dispatch({ type: "toggleShowDifficulty" });
  const toggleReverse = () => dispatch({ type: "toggleReverse" });
  const resetFilterOptions = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return {
    classification: state.classification,
    showDifficulty: state.showDifficulty,
    reverse: state.reverse,
    period: state.period,
    solvedStatus: state.solvedStatus,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleReverse,
    resetFilterOptions,
  };
};
