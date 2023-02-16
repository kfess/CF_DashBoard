import React from "react";
import { ProblemsTable } from "@features/problems/components/ProblemsTable";
import { useFetchProblems } from "@features/problems/useFetchProblem";

export const ProblemsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchProblems();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return <>{data && <ProblemsTable problems={data} />}</>;
};
