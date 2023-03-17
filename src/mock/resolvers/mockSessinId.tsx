import { ResponseResolver, MockedRequest, restContext } from "msw";
import { SessionData } from "@features/authentication/hooks/useGithubOauth";

export const mockSessionId: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const sessionData: SessionData = {
    sessionId: "abcdef",
    user: { id: "1234", name: "test_user", email: "", avatarUrl: "" },
  };

  return res(ctx.status(200), ctx.json(sessionData));
};
