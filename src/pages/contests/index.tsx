import React, { useMemo } from "react";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { useSolvedStatus } from "@features/submission/useSolvedStatus";
import {
  reshapeContests,
  getProblemIdxFromClassification,
} from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { FilterChips } from "@features/contests/components/FilterChips";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";

export const ContestsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchContests();

  const {
    state,
    classification,
    showDifficulty,
    showACStatus,
    pinTableHeader,
    reverse,
    period,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleShowACStatus,
    togglePinTableHeader,
    toggleReverse,
  } = useFilterOptionsState();

  const contests = useMemo(
    () => (data ? reshapeContests(data, classification, reverse, period) : []),
    [data, state.classification, state.reverse, period]
  );

  const problemIdxes = useMemo(
    () =>
      data ? getProblemIdxFromClassification(contests, classification) : [],
    [data, classification]
  );

  const { solvedSet, attemptedSet } = useSolvedStatus();

  if (
    isLoading ||
    !contests ||
    !problemIdxes ||
    (!solvedSet && !attemptedSet)
  ) {
    return <CircularProgress />;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <HeadLine title="Contests" />
      <FilterOptions
        showDifficulty={showDifficulty}
        showACStatus={showACStatus}
        pinTableHeader={pinTableHeader}
        reverse={reverse}
        classification={classification}
        period={state.period}
        solvedStatus={state.solvedStatus}
        setClassification={setClassification}
        setPeriod={setPeriod}
        setSolvedStatus={setSolvedStatus}
        toggleShowDifficulty={toggleShowDifficulty}
        toggleShowACStatus={toggleShowACStatus}
        togglePinTableHeader={togglePinTableHeader}
        toggleReverse={toggleReverse}
      />
      <div>
        <FilterChips
          classification={state.classification}
          setDefaultClassification={() => {
            setClassification("All");
          }}
          period={state.period}
          setPeriod={() => {
            setPeriod("All Period");
          }}
          solvedStatus={state.solvedStatus}
          setSolvedStatus={setSolvedStatus}
        />
      </div>
      {contests.length > 0 && problemIdxes.length > 0 && (
        <ContestsTable
          contests={contests}
          problemIdxes={problemIdxes}
          showDifficulty={state.showDifficulty}
          solvedSet={solvedSet}
          attemptedSet={attemptedSet}
        />
      )}
    </>
  );
};
