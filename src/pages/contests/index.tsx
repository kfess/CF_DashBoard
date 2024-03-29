import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFetchContests } from "@features/contests/hooks/useFetchContest";
import { useFilterOptionsState } from "@features/contests/hooks/useFilterOptionsState";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import {
  reshapeContests,
  filterAndSortContests,
} from "@features/contests/utils/reshapeContest";
import { getProblemIdxFromClassification } from "@features/contests/utils/problemIdxes";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { FilterChips } from "@features/contests/components/FilterChips";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import { HeadLine } from "@features/layout/components/HeadLine";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { VerticalContestTable } from "@features/contests/components/VerticalContestTable";
import { useMediaQuery } from "@mui/material";
import type { Contest, ReshapedContest } from "@features/contests/contest";
import { useURLQuery } from "@hooks/useQueryParams";

export const ContestsPage: React.FC = () => {
  const { queryParams, setURLQuery } = useURLQuery();
  const userId = queryParams["userId"];

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

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

  const contests = useMemo(() => {
    if (!data) return [];
    if (isSmallScreen) {
      return filterAndSortContests(
        data,
        classification,
        reverse,
        period,
        solvedStatus,
        solvedSet,
        userId
      );
    }
    return reshapeContests(
      data,
      classification,
      reverse,
      period,
      solvedStatus,
      solvedSet,
      userId
    );
  }, [
    data,
    classification,
    period,
    reverse,
    solvedStatus,
    isSmallScreen,
    userId,
    solvedSet,
  ]);

  const problemIdxes = useMemo(() => {
    if (!data || isSmallScreen) return [];
    return getProblemIdxFromClassification(
      contests as ReshapedContest[],
      classification
    );
  }, [data, classification, period, reverse, solvedStatus, isSmallScreen]);

  return (
    <Container maxWidth="lg">
      <Box py={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine
          title={`Contest${
            classification !== "All" ? " - " + classification : ""
          }`}
        />
        <Grid container spacing={1}>
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
                setURLQuery({ classification: undefined });
              }}
              period={period}
              setPeriod={() => {
                setPeriod("All Period");
                setURLQuery({ period: undefined });
              }}
              solvedStatus={solvedStatus}
              setSolvedStatus={setSolvedStatus}
            />
          </Grid>
          <Grid item xs={12}>
            {isSmallScreen ? (
              contests && contests.length > 0 ? (
                <VerticalContestTable
                  contests={contests as Contest[]}
                  showDifficulty={showDifficulty}
                  solvedSet={solvedSet}
                  attemptedSet={attemptedSet}
                />
              ) : (
                <NoDataMessage
                  title="No Contests Found"
                  message="Please check your filter options."
                />
              )
            ) : contests.length > 0 ? (
              <ContestsTable
                contests={contests as ReshapedContest[]}
                problemIdxes={problemIdxes}
                showDifficulty={showDifficulty}
                solvedStatus={solvedStatus}
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
