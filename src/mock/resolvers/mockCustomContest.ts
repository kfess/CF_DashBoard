import { MockedRequest, ResponseResolver, restContext } from "msw";
import type { CustomContest } from "@features/custom_contests/customContest";
import { range } from "@helpers/index";

export const mockFetchPublicCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const publicContest: CustomContest[] = [
    {
      title: "For beginners contest",
      owner: "applemelon",
      description: "This contest is for beginners",
      penalty: 200,
      startDate: "2023-03-03 21:00:00",
      endDate: "2023-03-04 21:00:00",
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
  ];
  return res(ctx.json([...publicContest]));
};

export const mockPrivateCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};
