import { ResponseResolver, MockedRequest, restContext } from "msw";

export const mockUpdateCodeforcesUsername: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.status(200));
};
