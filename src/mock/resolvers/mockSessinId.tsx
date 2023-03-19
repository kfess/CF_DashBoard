import { ResponseResolver, MockedRequest, restContext } from "msw";
import { SessionData } from "@features/authentication/session.atom";

export const mockPostSessionId: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const sessionData: SessionData = {
    sessionId: "abcdef",
    user: { id: "1234", name: "test_user" },
  };

  return res(
    ctx.status(200),
    ctx.json(sessionData),
    ctx.cookie("sessionId", sessionData.sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    })
  );
};
