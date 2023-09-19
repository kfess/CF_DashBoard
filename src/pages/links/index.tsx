import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material";
import { ExternalLink } from "@features/ui/component/ExternalLink";

type Resource = {
  readonly title: string;
  readonly url: string;
  readonly description: string;
};

const contestResources: Resource[] = [
  {
    title: "Codeforces",
    url: "https://codeforces.com/",
    description:
      "A popular platform for competitive programming contests and problem archives.",
  },
  {
    title: "AtCoder",
    url: "https://atcoder.jp/",
    description:
      "A Japanese platform hosting programming contests and providing an archive of problems.",
  },
  {
    title: "LeetCode",
    url: "https://leetcode.com/",
    description:
      "A platform focused on helping programmers prepare for technical interviews, with a wide range of problems.",
  },
  {
    title: "Topcoder",
    url: "https://www.topcoder.com/",
    description:
      "An established platform hosting programming contests, data science competitions, and providing freelance opportunities.",
  },
  {
    title: "HackerRank",
    url: "https://www.hackerrank.com/",
    description:
      "A popular platform for practicing and improving programming skills, with a variety of problem domains.",
  },
  {
    title: "Project Euler",
    url: "https://projecteuler.net/",
    description:
      "A collection of challenging mathematical and computational problems that require creative problem-solving.",
  },
  {
    title: "CodeChef",
    url: "https://www.codechef.com/",
    description:
      "An Indian platform for competitive programming, offering a wide range of contests and problems.",
  },
  {
    title: "Google Code Jam",
    url: "https://codingcompetitions.withgoogle.com/codejam",
    description:
      "An annual programming competition organized by Google, with challenging algorithmic problems.",
  },
  {
    title: "Facebook Hacker Cup",
    url: "https://www.facebook.com/hackercup/",
    description:
      "An annual programming competition organized by Facebook, featuring algorithmic and optimization problems.",
  },
  {
    title: "AOJ (Aizu Online Judge)",
    url: "https://judge.u-aizu.ac.jp/onlinejudge/",
    description: "A Japanese platform for practicing programming skills.",
  },
];

const usefulResources: Resource[] = [
  {
    title: "Atcoder Problems",
    url: "https://kenkoooo.com/atcoder/#/table/",
    description: "A website that provides a list of AtCoder problems.",
  },
  {
    title: "AOJ-ICPC",
    url: "http://aoj-icpc.ichyo.jp/",
    description:
      "AOJ-ICPC features unofficial difficulty rankings of problems from the Aizu Online Judge, including those from the ICPC Japan Regional contests, Asia Regional contests, and JAG programming contests, all evaluated by volunteers.",
  },
];
const LinksPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box py={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Competitive Programming Contests
        </Typography>
      </Box>
      <Grid container spacing={2} mb={2}>
        {contestResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  <ExternalLink
                    href={resource.url}
                    label={resource.title}
                    color={theme.palette.primary.main}
                  />
                </Typography>
                <Typography variant="body1">{resource.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Useful Resources
        </Typography>
      </Box>
      <Grid container spacing={2} mb={2}>
        {usefulResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  <ExternalLink
                    href={resource.url}
                    label={resource.title}
                    color={theme.palette.primary.main}
                  />
                </Typography>
                <Typography variant="body1">{resource.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LinksPage;
