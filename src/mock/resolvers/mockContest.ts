import { ResponseResolver, MockedRequest, restContext } from "msw";
import type { Contest } from "@features/contests/contest";
import { range } from "@helpers/index";

export const mockContest: ResponseResolver<MockedRequest, typeof restContext> =
  (req, res, ctx) => {
    const globalContests: Contest[] = range(1, 10).map((n) => {
      return {
        id: n,
        name: `Global-Contest-${n}`,
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
            index: "A1",
            rating: 800,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-A`,
            index: "A2",
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
            name: `${n}-problem-F1`,
            index: "F1",
            rating: 3000,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-F2`,
            index: "F2",
            rating: 3000,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
          {
            contestId: n,
            name: `${n}-problem-F3`,
            index: "F3",
            rating: 3000,
            type: "PROGRAMMING",
            tags: ["implementation"],
          },
        ],
      };
    });

    const div1Contests: Contest[] = range(11, 20).map((n) => {
      return {
        id: n,
        name: `div.1-Contest-${n}`,
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
