import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFetchContests } from "@features/contests/useFetchContest";
import { ContestsTable } from "@features/contests/components/ContestsTable";
import type { Classification } from "@features/contests/contest";
import { filterContest } from "@features/contests/helper";
import { FilterOptions } from "@features/contests/components/FilterOptions";

export const ContestsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchContests();
  const [tab, setTab] = useState<Classification>("All");
  const contest = filterContest(data ?? [], tab);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <FilterOptions tab={tab} setTab={setTab} />
      <ContestsTable contests={contest} />
    </>
  );
};
