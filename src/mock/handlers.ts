import { mockFetchPublicCustomContest } from "./resolvers/mockCustomContest";
import { rest } from "msw";
import { mockContest } from "@mock/resolvers/mockContest";
import { mockProblem } from "@mock/resolvers/mockProblems";
import { mockSubmission } from "@mock/resolvers/mockSubmission";
import {
  mockFetchPublicCustomContests,
  mockPrivateCustomContest,
} from "@mock/resolvers/mockCustomContest";

export const handlers = [
  rest.get("/mock/contests", mockContest),
  rest.get("/mock/submissions", mockSubmission),
  rest.get("/mock/problems", mockProblem),
  rest.get("/mock/customcontest/public", mockFetchPublicCustomContests),
  rest.get("/mock/customcontest/private", mockPrivateCustomContest),
  rest.get(
    "/mock/customcontest/public/random-uuid",
    mockFetchPublicCustomContest
  ),
];
