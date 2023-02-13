import { MockedRequest, ResponseResolver, restContext } from "msw";
import type { Problem } from "@features/problems/problem";
import { range } from "@helpers/index";

export const mockProblem: ResponseResolver<MockedRequest, typeof restContext> =
  (req, res, ctx) => {
    const globalProblems: Problem[] = range(1, 30).map((n) => {
      return {
        contestId: n,
        problemsetName: "globalTest",
        index: "A",
        name: `global-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 100 * n,
        tags: ["implementation", "binary search", "brute force"],
      };
    });

    const div1Problems: Problem[] = range(30, 60).map((n) => {
      return {
        contestId: n,
        problemsetName: "div1Test",
        index: "A",
        name: `div1-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 100 * (n - 30),
        tags: ["implementation", "binary search", "brute force"],
      };
    });

    const educationalProblems: Problem[] = range(60, 90).map((n) => {
      return {
        contestId: n,
        problemsetName: "educationalTest",
        index: "A",
        name: `educational-contest-problem-${n}`,
        type: "PROGRAMMING",
        rating: 1000 + 100 * (n - 60),
        tags: ["implementation", "binary search", "brute force"],
      };
    });

    return res(
      ctx.json([...globalProblems, ...div1Problems, ...educationalProblems])
    );
  };
