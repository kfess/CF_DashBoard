import { ResponseResolver, MockedRequest, restContext } from "msw";
import type { Contest } from "@features/contests/contest";

const range = (i: number, j: number): number[] => {
  return Array.from({ length: j - i + 1 }, (_, index) => {
    return index + i;
  });
};

export const mockContest: ResponseResolver<MockedRequest, typeof restContext> =
  (req, res, ctx) => {
    const globalContests: Contest[] = range(1, 10).map((n) => {
      return {
        contestId: n,
        contestName: `Global-Contest-${n}`,
        type: "CF",
        classification: "Global",
        frozen: false,
        phase: "FINISHED",
        durationSeconds: 18000,
        startTimeSeconds: 1674381600 + n,
        problems: [
          {
            contestId: n,
            name: `${n}-problem-A`,
            index: "A",
            rating: 800,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-B`,
            index: "B",
            rating: 1200,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-C`,
            index: "C",
            rating: 1800,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-D`,
            index: "D",
            rating: 2200,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-E`,
            index: "E",
            rating: 2600,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-F`,
            index: "F",
            rating: 3000,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
        ],
      };
    });

    const div1Contests: Contest[] = range(11, 20).map((n) => {
      return {
        contestId: n,
        contestName: `div.1-Contest-${n}`,
        type: "CF",
        classification: "Div. 1",
        frozen: false,
        phase: "FINISHED",
        durationSeconds: 18000,
        startTimeSeconds: 1674381600 + n,
        problems: [
          {
            contestId: n,
            name: `${n}-problem-A`,
            index: "A",
            rating: 900,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-B`,
            index: "B",
            rating: 1600,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-C`,
            index: "C",
            rating: 1900,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-D`,
            index: "D",
            rating: 2300,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-E`,
            index: "E",
            rating: 2800,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-F`,
            index: "F",
            rating: 3200,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
        ],
      };
    });

    return res(ctx.json([...globalContests, ...div1Contests]));
  };
