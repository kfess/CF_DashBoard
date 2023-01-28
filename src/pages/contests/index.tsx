import React, { useState } from "react";
import { useFetchContests } from "@features/contests/useFetchContest";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import type { Classification } from "@features/contests/contest";
import { filterContest, getProblemIdxes } from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";

export const ContestsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchContests();
  const [tab, setTab] = useState<Classification>("All");
  const [revserse, setReverse] = useState<boolean>(false);
  const toggleOrder = () => {
    setReverse(!revserse);
  };

  const contest = filterContest(data ?? [], tab);
  const problemIdxes = getProblemIdxes(contest);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      {String(revserse)}
      <FilterOptions
        tab={tab}
        setTab={setTab}
        reverse={revserse}
        toggleOrder={toggleOrder}
      />
      <ContestsTable contests={contest} problemIdxes={problemIdxes} />
    </>
  );
};
