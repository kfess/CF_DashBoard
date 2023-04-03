import React from "react";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { RecommendProblemsTable } from "@features/recommendation/components/RecommendProblemsTable";
import { recommendLevels } from "@features/recommendation/recommend";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import { HeadLine } from "@features/layout/components/HeadLine";
import { Tabs } from "@features/ui/component/Tabs";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";

export const RecommendationPage: React.FC = () => {
  const queryUserId = useQueryParams(QueryParamKeys.USERID);

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
          level={level}
          userRating={userRating}
          problems={data}
        />
      ),
      disabled: false,
    };
  });

  return (
    <>
      <HeadLine title="Recommend" />
      <Box sx={{ width: "100%" }}>
        <Tabs tabItems={tabItems} />
      </Box>
    </>
  );
};
