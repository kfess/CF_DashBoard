import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { RecommendProblemsTable } from "@features/recommendation/components/RecommendProblemsTable";
import { recommendLevels } from "@features/recommendation/recommend";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Tabs } from "@features/ui/component/Tabs";
import { useURLQuery } from "@hooks/useQueryParams";

export const RecommendationPage: React.FC = () => {
  const { queryParams } = useURLQuery();
  const queryUserId = queryParams["userId"];

  const {
    data: userData,
    isError: userIsError,
    isSuccess,
  } = useFetchUserInfo({
    userId: queryUserId,
  });
  const userRating = userData?.rating;

  const { data, isError, error, isLoading } = useFetchProblems();

  const tabItems: TabItem[] = recommendLevels.map((level) => {
    return {
      label: level,
      children: data && (
        <RecommendProblemsTable
          key={level}
          level={level}
          userRating={userRating}
          problems={data}
        />
      ),
      disabled: false,
    };
  });

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Recommend" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs tabItems={tabItems} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
