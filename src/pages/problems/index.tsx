import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { chooseRandomIndex } from "@helpers/random";
import { ProblemsTable } from "@features/problems/components/ProblemsTable";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { Tag } from "@features/problems/problem";
import type { Classification } from "@features/contests/contest";
import type { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { ratingColorInfo } from "@features/color/ratingColor";
import { FilterOptions } from "@features/problems/components/FilterOptions";
import { useToggle } from "@hooks/index";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { HeadLine } from "@features/layout/components/HeadLine";
import { TagItems } from "@features/problems/components/TagItems";
import { DifficultyStatus } from "@features/problems/components/DifficultyStatus";

export const ProblemsPage: React.FC = () => {
  const { data: problems, isLoading } = useFetchProblems();

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
  const [showTags, toggleShowTags, setShowTags] = useToggle(false, true);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Difficulty Table" />
        {problems && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DifficultyStatus problems={problems} />
            </Grid>
          </Grid>
        )}
        <HeadLine title="Problem List" />
        {problems && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TagItems
                problems={problems}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
              <FilterOptions
                problem={chooseRandomIndex(problems)}
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
                showTags={showTags}
                toggleShowTags={toggleShowTags}
                setShowTags={setShowTags}
              />
            </Grid>
            <Grid item xs={12}>
              <ProblemsTable
                problems={problems}
                selectedTags={selectedTags}
                classification={classification}
                lowerDifficulty={lowerDifficulty}
                upperDifficulty={upperDifficulty}
                showTags={showTags}
                solvedStatus={solvedStatus}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};
