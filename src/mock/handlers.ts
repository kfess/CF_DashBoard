import { rest } from "msw";
import { mockContest } from "@mock/resolvers/mockContest";
import { mockProblem } from "@mock/resolvers/mockProblems";
import { mockSubmission } from "@mock/resolvers/mockSubmission";
import {
  mockPublicCustomContest,
  mockPrivateCustomContest,
} from "@mock/resolvers/mockCustomContest";

export const handlers = [
  rest.get("/mock/contests", mockContest),
  rest.get("/mock/submissions", mockSubmission),
  rest.get("/mock/problems", mockProblem),
  rest.get("/mock/customcontest/public", mockPublicCustomContest),
  rest.get("/mock/customcontest/private", mockPrivateCustomContest),
];
