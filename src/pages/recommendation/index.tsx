import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { RecommendProblemsTable } from "@features/recommendation/components/RecommendProblemsTable";
import { recommendLevels } from "@features/recommendation/recommend";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useURLQuery } from "@hooks/useQueryParams";
import { TabPanel, Tabs, Tab } from "@features/ui/component/Tabs";

export const RecommendationPage: React.FC = () => {
  const { queryParams, setURLQuery } = useURLQuery();
  const queryUserId = queryParams["userId"];

  const { data: userData } = useFetchUserInfo({
    userId: queryUserId,
  });
  const userRating = userData?.rating;

  const { data } = useFetchProblems();

  const index = recommendLevels.findIndex(
    (level) => level === queryParams["level"]
  );
  const [tabValue, setTabValue] = React.useState(index === -1 ? 0 : index);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setURLQuery({ level: recommendLevels[newValue] });
  };

  return (
    <Container maxWidth="lg">
      <Box p={{ xs: 2, md: 4 }}>
        <HeadLine title="Recommend" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="Problems and Standings Tabs"
            >
              {recommendLevels.map((level, index) => {
                return <Tab key={level} value={index} label={level} />;
              })}
            </Tabs>
            {data &&
              recommendLevels.map((level, index) => {
                return (
                  <TabPanel key={level} value={tabValue} index={index}>
                    <RecommendProblemsTable
                      key={level}
                      level={level}
                      userRating={userRating}
                      problems={data}
                    />
                  </TabPanel>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
