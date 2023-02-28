import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockPublicCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};

export const mockPrivateCustomContest: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.json([]));
};
