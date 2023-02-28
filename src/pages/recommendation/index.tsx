import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { RecommendProblemsTable } from "@features/recommendation/components/RecommendProblemsTable";
import { recommendLevels } from "@features/recommendation/recommend";
import { useFetchProblems } from "@features/problems/useFetchProblem";

export const RecommendationPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const queryUserId = urlQueries.get("userId") ?? "";

  // If queryUserId is not falsy ("", undefined, null, ...),
  // asynchronously fetch User Info by React-Query
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
    <Box sx={{ width: "100%" }}>
      <Tabs tabItems={tabItems} />
    </Box>
  );
};
