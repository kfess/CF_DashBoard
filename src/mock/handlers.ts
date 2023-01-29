import { rest } from "msw";
import { mockContest } from "@mock/resolvers/mockContest";
import { mockSubmission } from "@mock/resolvers/mockSubmission";

export const handlers = [
  rest.get("/mock/contests", mockContest),
  rest.get("/mock/submissions", mockSubmission),
];
