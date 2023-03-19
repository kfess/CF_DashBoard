import { rest } from "msw";
import { mockContest } from "@mock/resolvers/mockContest";
import { mockProblem } from "@mock/resolvers/mockProblems";
import { mockSubmission } from "@mock/resolvers/mockSubmission";
import {
  mockFetchPublicCustomContests,
  mockFetchPublicCustomContest,
  mockPrivateCustomContest,
} from "@mock/resolvers/mockCustomContest";
import { mockPostSessionId } from "./resolvers/mockSessinId";
import {
  mockAddJoinedCustomContest,
  mockAddOwnedCustomContest,
  mockFetchUserProfile,
  mockUpdateCodeforcesUsername,
} from "@mock/resolvers/mockUserProfile";

export const handlers = [
  rest.get("/mock/contests", mockContest),
  rest.get("/mock/submissions", mockSubmission),
  rest.get("/mock/problems", mockProblem),
  rest.get("/mock/custom-contest/public", mockFetchPublicCustomContests),
  rest.get("/mock/customcontest/private", mockPrivateCustomContest),
  rest.get(
    "/mock/custom-contest/public/random-uuid",
    mockFetchPublicCustomContest
  ),
  rest.post("/mock/authenticate", mockPostSessionId),
  rest.get("/mock/user/get", mockFetchUserProfile),
  rest.post("/mock/user/update", mockUpdateCodeforcesUsername),
  rest.post("/mock/user/ownedContests/add", mockAddOwnedCustomContest),
  rest.post("/mock/user/joinedContest/add", mockAddJoinedCustomContest),
];
