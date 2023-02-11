import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchContests } from "@features/contests/useFetchContest";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import type { Classification } from "@features/contests/contest";
import { reshapeContests, getProblemIdxes } from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";
import { useSolvedStatus } from "@features/submission/useSolvedStatus";
import { LabelsChip } from "@features/bookmark/components/LabelIcon";
import { CustomBreadcrumbs } from "@features/ui/component/BreadCrumbs";
import type { PeriodWord } from "@features/contests/components/PeriodFilter";
import type { SolvedStatus } from "@features/contests/components/SolvedStatusFilter";

export const ContestsPage: React.FC = () => {
  const { pathname } = useLocation();
  const { data, isError, error, isLoading } = useFetchContests();
  const [tab, setTab] = useState<Classification>("All");

  const [period, setPeriod] = useState<PeriodWord>("All Period");

  const [solvedStatus, setSolvedStatus] =
    useState<SolvedStatus>("All Contests");

  const [showDifficulty, setshowDifficulty] = useState<boolean>(true);
  const toggleShowDifficulty = useCallback(() => {
    setshowDifficulty(!showDifficulty);
  }, [showDifficulty]);

  const [reverse, setReverse] = useState<boolean>(false);
  const toggleOrder = useCallback(() => {
    setReverse(!reverse);
  }, [reverse]);

  const contests = reshapeContests(data ?? [], tab, reverse);
  const problemIdxes = getProblemIdxes(data ?? []);

  const { solvedSet, attemptedSet } = useSolvedStatus();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <CustomBreadcrumbs path={pathname} />
      <h2 css={{ textAlign: "left" }}>Contests</h2>
      <div css={{ textAlign: "right" }}>
        <LabelsChip />
      </div>
      <FilterOptions
        tab={tab}
        setTab={setTab}
        period={period}
        setPeriod={setPeriod}
        solvedStatus={solvedStatus}
        setSolvedStatus={setSolvedStatus}
        showDifficulty={showDifficulty}
        toggleShowDifficulty={toggleShowDifficulty}
        reverse={reverse}
        toggleOrder={toggleOrder}
      />
      {/* <ContestsTable
        contests={contests}
        problemIdxes={problemIdxes}
        showDifficulty={showDifficulty}
        solvedSet={solvedSet}
        attemptedSet={attemptedSet}
      /> */}
    </>
  );
};
