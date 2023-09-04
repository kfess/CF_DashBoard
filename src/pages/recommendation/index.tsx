import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { RecommendProblemsTable } from "@features/recommendation/components/RecommendProblemsTable";
import { recommendLevels } from "@features/recommendation/recommend";
import { useFetchProblems } from "@features/problems/hooks/useFetchProblem";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useURLQuery } from "@hooks/useQueryParams";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel_ } from "@features/ui/component/Tabs";

export const RecommendationPage: React.FC = () => {
  const { queryParams } = useURLQuery();
  const queryUserId = queryParams["userId"];

  const { data: userData } = useFetchUserInfo({
    userId: queryUserId,
  });
  const userRating = userData?.rating;

  const { data } = useFetchProblems();

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Recommend" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="Problems and Standings Tabs"
            >
              {recommendLevels.map((level, index) => {
                return (
                  <Tab
                    key={level}
                    value={index}
                    label={<Typography fontWeight="bold">{level}</Typography>}
                    sx={{ textTransform: "none" }}
                    disableTouchRipple
                  />
                );
              })}
            </Tabs>
            {data &&
              recommendLevels.map((level, index) => {
                return (
                  <TabPanel_ key={level} value={tabValue} index={index}>
                    <RecommendProblemsTable
                      key={level}
                      level={level}
                      userRating={userRating}
                      problems={data}
                    />
                  </TabPanel_>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

// export const RecommendationPage: React.FC = () => {
//   const { queryParams } = useURLQuery();
//   const queryUserId = queryParams["userId"];

//   const {
//     data: userData,
//     isError: userIsError,
//     isSuccess,
//   } = useFetchUserInfo({
//     userId: queryUserId,
//   });
//   const userRating = userData?.rating;

//   const { data, isError, error, isLoading } = useFetchProblems();

//   const tabItems: TabItem[] = recommendLevels.map((level) => {
//     return {
//       label: level,
//       children: data && (
//         <RecommendProblemsTable
//           key={level}
//           level={level}
//           userRating={userRating}
//           problems={data}
//         />
//       ),
//       disabled: false,
//     };
//   });

//   return (
//     <Container maxWidth="lg">
//       <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
//         <HeadLine title="Recommend" />
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Tabs tabItems={tabItems} />
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };
