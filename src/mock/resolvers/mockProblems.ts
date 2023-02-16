import { MockedRequest, ResponseResolver, restContext } from "msw";
import type { Problem } from "@features/problems/problem";
import { range } from "@helpers/index";

export const mockProblem: ResponseResolver<MockedRequest, typeof restContext> =
  (req, res, ctx) => {
    const globalProblems: Problem[] = range(1, 20).map((n) => {
      return {
        contestId: n,
        contestName: `globalProblem-${n}`,
        problemsetName: "globalTest",
        index: "A",
        name: `global-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 100 * n,
        tags: ["implementation", "binary search", "brute force"],
        classification: "Global",
      };
    });

    const div1Problems: Problem[] = range(21, 40).map((n) => {
      return {
        contestId: n,
        contestName: `div1Problem-${n}`,
        problemsetName: "div1Test",
        index: "A",
        name: `div1-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 100 * (n - 21),
        tags: ["implementation", "binary search", "brute force"],
        classification: "Div. 1",
      };
    });

    const educationalProblems: Problem[] = range(41, 67).map((n) => {
      return {
        contestId: n,
        contestName: `educationalProblem-${n}`,
        problemsetName: "educationalTest",
        index: "A",
        name: `educational-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 100 * (n - 41),
        tags: ["implementation", "binary search", "brute force"],
        classification: "Educational",
      };
    });

    return res(
      ctx.json([...globalProblems, ...div1Problems, ...educationalProblems])
    );
  };
