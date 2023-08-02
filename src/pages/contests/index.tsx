import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import { reshapeContests } from "@features/contests/utils/reshapeContest";
import { getProblemIdxFromClassification } from "@features/contests/utils/problemIdxes";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { FilterChips } from "@features/contests/components/FilterChips";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { HeadLine } from "@features/layout/components/HeadLine";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";

export const ContestsPage: React.FC = () => {
  const { data } = useFetchContests();
  const { solvedSet, attemptedSet } = useSolvedStatus();
  const {
    classification,
    showDifficulty,
    reverse,
    period,
    solvedStatus,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleReverse,
  } = useFilterOptionsState();

  const contests = useMemo(
    () =>
      data
        ? reshapeContests(data, classification, reverse, period, solvedStatus)
        : [],
    [data, classification, period, reverse, solvedStatus]
  );

  const problemIdxes = useMemo(
    () =>
      data ? getProblemIdxFromClassification(contests, classification) : [],
    [data, classification, period, reverse, solvedStatus]
  );

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Contests" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FilterOptions
              showDifficulty={showDifficulty}
              reverse={reverse}
              classification={classification}
              period={period}
              solvedStatus={solvedStatus}
              setClassification={setClassification}
              setPeriod={setPeriod}
              setSolvedStatus={setSolvedStatus}
              toggleShowDifficulty={toggleShowDifficulty}
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
            {contests.length > 0 ? (
              <ContestsTable
                contests={contests}
                problemIdxes={problemIdxes}
                showDifficulty={showDifficulty}
                solvedSet={solvedSet}
                attemptedSet={attemptedSet}
              />
            ) : (
              <NoDataMessage
                title="No Contests Found"
                message="Please check your filter options."
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
