import React, { useMemo } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { useSolvedStatus } from "@features/submission/useSolvedStatus";
import {
  reshapeContests,
  getProblemIdxFromClassification,
} from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { LabelsChip } from "@features/bookmark/components/LabelsChip";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { FilterChips } from "@features/contests/components/FilterChips";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { Input } from "@features/ui/component/Input";
import { useFetchOfficialContests } from "@features/contests/hooks/useFetchOfficialContest";

export const ContestsPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  // const { data, isError, error, isLoading } = useFetchContests();
  const { data, isError, error, isLoading } = useFetchOfficialContests();

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

  const { solvedSet, attemptedSet } = useSolvedStatus(userId);

  console.log(attemptedSet);

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
      <div css={{ width: "50%" }}>
        <Input />
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h1">
          Contests
        </Typography>
        <LabelsChip />
      </div>
      <Divider />
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
