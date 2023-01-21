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
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-B",
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-C",
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-D",
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-E",
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: 1000,
            name: "problem-F",
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
        ],
      },
    ];
    return res(ctx.json(contests));
  };
