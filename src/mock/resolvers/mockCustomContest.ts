import { MockedRequest, ResponseResolver, restContext } from "msw";
import type { CustomContest } from "@features/custom_contests/customContest";
import { range } from "@helpers/index";

export const mockFetchPublicCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const finishedContests: CustomContest[] = [
    {
      title: "For beginners contest",
      owner: "applemelon",
      description: "This contest is for beginners",
      penalty: 200,
      startDate: "2023-03-01 21:00:00",
      endDate: "2023-03-02 21:00:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `globalProblem-${n}`,
          problemsetName: "globalTest",
          index: "A",
          name: `global-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "binary search", "brute force"],
          classification: "Global",
        };
      }),
      participants: ["applemelon", "kenkoooo"],
    },
    {
      title: "For intermediate level contest",
      owner: "applemelon",
      description: "This contest is for intermediate levels",
      penalty: 300,
      startDate: "2023-03-01 18:00:00",
      endDate: "2023-03-01 19:30:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `educationalProblem-${n}`,
          problemsetName: "educationalTest",
          index: "A",
          name: `educational-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "bitmasks"],
          classification: "Educational",
        };
      }),
      participants: ["applemelon", "kenkoooo", "tourist"],
    },
    {
      title: "For high level contest",
      owner: "applemelon",
      description: "This contest is for high levels",
      penalty: 300,
      startDate: "2023-02-20 16:00:00",
      endDate: "2023-02-20 18:00:00",
      visibility: "Public",
      problems: range(1, 6).map((n) => {
        return {
          contestId: n,
          contestName: `educationalProblem-${n}`,
          problemsetName: "educationalTest",
          index: "A",
          name: `educational-contest-problem-${n}`,
          type: "PROGRAMMING",
          rating: 1000 + 200 * n,
          tags: ["implementation", "bitmasks"],
          classification: "Educational",
        };
      }),
      participants: ["applemelon", "kenkoooo", "tourist", "Petr"],
    },
  ];
  return res(ctx.json([...finishedContests]));
};

export const mockPrivateCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};
