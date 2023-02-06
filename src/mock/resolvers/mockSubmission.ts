import { ResponseResolver, MockedRequest, restContext } from "msw";
import type {
  Submission,
  SubmissionAPI,
} from "@features/submission/submission";

const range = (i: number, j: number): number[] => {
  return Array.from({ length: j - i + 1 }, (_, index) => {
    return index + i;
  });
};

export const mockSubmission: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const globalUserSubmissions: Submission[] = range(1, 5).map((n) => {
    return {
      id: n,
      contestId: n,
      creationTimeSeconds: 1,
      relativeTimeSeconds: 1,
      author: {
        contestId: n,
        members: [{ handle: "testUser" }],
        participantType: "CONTESTANT",
        ghost: false,
      },
      programmingLanguage: "Rust",
      verdict: "OK",
      testset: "TESTS",
      timeConsumedMillis: 1,
      memoryConsumedBytes: 1,
      problem: {
        contestId: n,
        name: `${n}-problem-A`,
        index: "A",
        rating: 800,
        type: "PROGRAMMING",
        tags: ["implementation"],
      },
    };
  });

  const div1UserSubmissions: Submission[] = range(11, 15).map((n) => {
    return {
      id: n,
      contestId: n,
      creationTimeSeconds: 1,
      relativeTimeSeconds: 1,
      author: {
        contestId: n,
        members: [{ handle: "testUser" }],
        participantType: "CONTESTANT",
        ghost: false,
      },
      programmingLanguage: "Rust",
      verdict: "OK",
      testset: "TESTS",
      timeConsumedMillis: 1,
      memoryConsumedBytes: 1,
      problem: {
        contestId: n,
        name: `${n}-problem-A`,
        index: "A",
        rating: 800,
        type: "PROGRAMMING",
        tags: ["implementation"],
      },
    };
  });

  const userSubmissions: SubmissionAPI = {
    status: "OK",
    result: [...globalUserSubmissions, ...div1UserSubmissions],
  };

  return res(ctx.json(userSubmissions));
};
