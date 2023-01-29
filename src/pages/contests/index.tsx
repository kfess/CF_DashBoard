import React, { useState } from "react";
import { useFetchContests } from "@features/contests/useFetchContest";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import type { Classification } from "@features/contests/contest";
import { reshapeContests, getProblemIdxes } from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";

export const ContestsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchContests();
  const [tab, setTab] = useState<Classification>("All");
  const [reverse, setReverse] = useState<boolean>(false);
  const toggleOrder = () => {
    setReverse(!reverse);
  };

  const contests = reshapeContests(data ?? [], tab, reverse);
  const problemIdxes = getProblemIdxes(data ?? []);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <FilterOptions
        tab={tab}
        setTab={setTab}
        reverse={reverse}
        toggleOrder={toggleOrder}
      />
      <ContestsTable contests={contests} problemIdxes={problemIdxes} />
    </>
  );
};
