import { rest } from "msw";
import { mockContest } from "@mock/resolvers/mockContest";
import { mockProblem } from "@mock/resolvers/mockProblems";
import { mockSubmission } from "@mock/resolvers/mockSubmission";
import {
  mockFetchContests,
  mockFetchContest,
  mockAddContest,
  mockEditContest,
  mockDeleteContest,
  mockAddParticipantToContest,
  mockHasUserRegistered,
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

  rest.post("/mock/authenticate", mockPostSessionId),
  rest.get("/mock/user/get", mockFetchUserProfile),
  rest.post("/mock/user/update", mockUpdateCodeforcesUsername),
  rest.post("/mock/user/ownedContests/add", mockAddOwnedCustomContest),
  rest.post("/mock/user/joinedContest/add", mockAddJoinedCustomContest),

  rest.get("/mock/custom-contest/contests", mockFetchContests),
  rest.get("/mock/custom-contest/:contestId", mockFetchContest),
  rest.post("/mock/custom-contest/contests", mockAddContest),
  rest.put("/mock/custom-contest/:contestId", mockEditContest),
  rest.delete("/mock/custom-contest/:contestId", mockDeleteContest),
  rest.put(
    "/mock/custom-contest/:contestId/participants",
    mockAddParticipantToContest
  ),
  rest.get(
    "/mock/custom-contest/:contestId/has-user-registered",
    mockHasUserRegistered
  ),
];
