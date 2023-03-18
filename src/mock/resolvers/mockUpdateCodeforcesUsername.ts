import { ResponseResolver, MockedRequest, restContext } from "msw";

export const mockUpdateCodeforcesUsername: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  const codeforcesUsername = "applemelon";
  return res(ctx.status(200), ctx.json(codeforcesUsername));
};
