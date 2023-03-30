import React from "react";
import { useLocation } from "react-router-dom";
import { useFetchContests } from "@features/contests/useFetchContest";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { reshapeContests, getProblemIdxes } from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { useSolvedStatus } from "@features/submission/useSolvedStatus";
import { LabelsChip } from "@features/bookmark/components/LabelsChip";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { Button } from "@features/ui/component/Button";

export const ContestsPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const { data, isError, error, isLoading } = useFetchContests();

  const {
    state,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleShowACStatus,
    togglePinTableHeader,
    toggleReverse,
  } = useFilterOptionsState();

  const contests =
    data && reshapeContests(data, state.classification, state.reverse);
  const problemIdxes = data && getProblemIdxes(data);

  const { solvedSet, attemptedSet } = useSolvedStatus(userId);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <div>
      <h2 css={{ textAlign: "left" }}>Contests</h2>
      <div css={{ textAlign: "right" }}>
        <LabelsChip />
      </div>
      <FilterOptions
        state={state}
        classification={state.classification}
        setClassification={setClassification}
        period={state.period}
        setPeriod={setPeriod}
        solvedStatus={state.solvedStatus}
        setSolvedStatus={setSolvedStatus}
        toggleShowDifficulty={toggleShowDifficulty}
        toggleShowACStatus={toggleShowACStatus}
        togglePinTableHeader={togglePinTableHeader}
        toggleReverse={toggleReverse}
      />
      {contests && problemIdxes && (
        <ContestsTable
          contests={contests}
          problemIdxes={problemIdxes}
          showDifficulty={state.showDifficulty}
          solvedSet={solvedSet}
          attemptedSet={attemptedSet}
        />
      )}
    </div>
  );
};
