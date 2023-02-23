import React, { useState } from "react";
import { ProblemsTable } from "@features/problems/components/ProblemsTable";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import { Tag } from "@features/problems/problem";
import type { Classification } from "@features/contests/contest";
import type { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { ratingColorInfo } from "@features/color/ratingColor";
import { FilterOptions } from "@features/problems/components/FilterOptions";
import { LabelsChip } from "@features/bookmark/components/LabelsChip";
import { useToggle } from "@hooks/index";

export const ProblemsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchProblems();

  const [classification, setClassification] = useState<Classification>("All");

  const [solvedStatus, setSolvedStatus] =
    useState<SolvedStatus>("All Problems");

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [lowerDifficulty, setLowerDifficulty] = useState(
    ratingColorInfo.Gray.lowerBound
  );
  const [upperDifficulty, setUpperDifficulty] = useState(
    ratingColorInfo.DeepRed.upperBound
  );

  const [showTags, toggleShowTags] = useToggle(false);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <div css={{ textAlign: "right" }}>
        <LabelsChip />
      </div>
      <FilterOptions
        classification={classification}
        setClassification={setClassification}
        solvedStatus={solvedStatus}
        setSolvedStatus={setSolvedStatus}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        lowerDifficulty={lowerDifficulty}
        setLowerDifficulty={setLowerDifficulty}
        upperDifficulty={upperDifficulty}
        setUpperDifficulty={setUpperDifficulty}
        toggleShowTags={toggleShowTags}
      />
      {data && (
        <ProblemsTable
          problems={data}
          selectedTags={selectedTags}
          classification={classification}
          lowerDifficulty={lowerDifficulty}
          upperDifficulty={upperDifficulty}
          showTags={showTags}
        />
      )}
    </>
  );
};
