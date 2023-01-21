import { ResponseResolver, MockedRequest, restContext } from "msw";
import type { Contest } from "@features/contests/contest";

export const mockContest: ResponseResolver<MockedRequest, typeof restContext> =
  (req, res, ctx) => {
    const contests: Contest[] = [
      {
        id: 1,
        name: "contest-1",
        type: "CF",
        phase: "BEFORE",
        frozen: false,
        durationSeconds: 18000,
        startTimeSeconds: 1674381600,
        problems: [
          {
            contestId: 1000,
            name: "problem-A",
            rating: 800,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-B",
            rating: 1200,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-C",
            rating: 1800,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-D",
            rating: 2200,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-E",
            rating: 2600,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-F",
            rating: 3000,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
        ],
      },
    ];
    return res(ctx.json(contests));
  };
