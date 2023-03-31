import React from "react";
import { Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { reshapeContests, getProblemIdxes } from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { useSolvedStatus } from "@features/submission/useSolvedStatus";
import { LabelsChip } from "@features/bookmark/components/LabelsChip";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { FilterChips } from "@features/contests/components/FilterChips";

export const ContestsPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const { data, isError, error, isLoading } = useFetchContests();

  const {
    state,
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
    <>
      <Typography variant="h4" component="h1">
        Contests
      </Typography>
      <Divider />
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <FilterOptions
          showDifficulty={showDifficulty}
          showACStatus={showACStatus}
          pinTableHeader={pinTableHeader}
          reverse={reverse}
          classification={state.classification}
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
        <LabelsChip />
      </div>
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

      {contests && problemIdxes && (
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
