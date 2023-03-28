import { useReducer, useCallback } from "react";
import type { Classification } from "../contest";
import type { PeriodWord } from "../components/PeriodFilter";
import type { SolvedStatus } from "../components/SolvedStatusFilter";

export type FilterOptionsState = {
  classification: Classification;
  period: PeriodWord;
  solvedStatus: SolvedStatus;
  showDifficulty: boolean;
  showACStatus: boolean;
  pinTableHeader: boolean;
  reverse: boolean;
};

type FilterOptionsAction =
  | { type: "setClassification"; classification: Classification }
  | { type: "setPeriod"; period: PeriodWord }
  | { type: "setSolvedStatus"; solvedStatus: SolvedStatus }
  | { type: "toggleShowDifficulty" }
  | { type: "toggleShowACStatus" }
  | { type: "togglePinTableHeader" }
  | { type: "toggleReverse" }
  | { type: "reset" };

const initialState: FilterOptionsState = {
  classification: "All",
  period: "All Period",
  solvedStatus: "All Contests",
  showDifficulty: true,
  showACStatus: true,
  pinTableHeader: false,
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
    case "toggleShowACStatus":
      return { ...state, showACStatus: !state.showACStatus };
    case "togglePinTableHeader":
      return { ...state, pinTableHeader: !state.pinTableHeader };
    case "toggleReverse":
      return { ...state, reverse: !state.reverse };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const useFilterOptionsState = () => {
  const [state, dispatch] = useReducer(filterOptionsReducer, initialState) as [
    FilterOptionsState,
    React.Dispatch<FilterOptionsAction>
  ];

  const setClassification = (classification: Classification) =>
    dispatch({ type: "setClassification", classification });
  const setPeriod = (period: PeriodWord) =>
    dispatch({ type: "setPeriod", period });
  const setSolvedStatus = (solvedStatus: SolvedStatus) =>
    dispatch({ type: "setSolvedStatus", solvedStatus });
  const toggleShowDifficulty = () => dispatch({ type: "toggleShowDifficulty" });
  const toggleShowACStatus = () => dispatch({ type: "toggleShowACStatus" });
  const togglePinTableHeader = () => dispatch({ type: "togglePinTableHeader" });
  const toggleReverse = () => dispatch({ type: "toggleReverse" });
  const resetFilterOptions = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return {
    state,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleShowACStatus,
    togglePinTableHeader,
    toggleReverse,
    resetFilterOptions,
  };
};
