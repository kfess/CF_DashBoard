import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import {
  reshapeContests,
  getProblemIdxFromClassification,
} from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { FilterChips } from "@features/contests/components/FilterChips";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";

export const ContestsPage: React.FC = () => {
  const { data } = useFetchContests();

  const {
    state,
    classification,
    showDifficulty,
    showACStatus,
    pinTableHeader,
    reverse,
    period,
    solvedStatus,
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
    [data, classification, reverse, period]
  );

  const problemIdxes = useMemo(
    () =>
      data ? getProblemIdxFromClassification(contests, classification) : [],
    [data, classification]
  );

  const { solvedSet, attemptedSet } = useSolvedStatus();

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Contests" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FilterOptions
              showDifficulty={showDifficulty}
              showACStatus={showACStatus}
              pinTableHeader={pinTableHeader}
              reverse={reverse}
              classification={classification}
              period={period}
              solvedStatus={solvedStatus}
              setClassification={setClassification}
              setPeriod={setPeriod}
              setSolvedStatus={setSolvedStatus}
              toggleShowDifficulty={toggleShowDifficulty}
              toggleShowACStatus={toggleShowACStatus}
              togglePinTableHeader={togglePinTableHeader}
              toggleReverse={toggleReverse}
            />
          </Grid>
          <Grid item xs={12}>
            <FilterChips
              classification={classification}
              setDefaultClassification={() => {
                setClassification("All");
              }}
              period={period}
              setPeriod={() => {
                setPeriod("All Period");
              }}
              solvedStatus={solvedStatus}
              setSolvedStatus={setSolvedStatus}
            />
          </Grid>
          <Grid item xs={12}>
            {contests.length > 0 && problemIdxes.length > 0 && (
              <ContestsTable
                contests={contests}
                problemIdxes={problemIdxes}
                showDifficulty={state.showDifficulty}
                solvedSet={solvedSet}
                attemptedSet={attemptedSet}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
