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
import { useFetchOfficialContests } from "@features/contests/hooks/useFetchOfficialContest";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";

export const ContestsPage: React.FC = () => {
  const userId = useQueryParams(QueryParamKeys.USERID);

  const { data, isError, error, isLoading } = useFetchContests();
  // const { data, isError, error, isLoading } = useFetchOfficialContests();

  const {
    state,
    classification,
    showDifficulty,
    showACStatus,
    pinTableHeader,
    reverse,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleShowACStatus,
    togglePinTableHeader,
    toggleReverse,
  } = useFilterOptionsState();

  const contests = useMemo(
    () =>
      data ? reshapeContests(data, state.classification, state.reverse) : [],
    [data, state.classification, state.reverse]
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
    (userId && !solvedSet && !attemptedSet)
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
