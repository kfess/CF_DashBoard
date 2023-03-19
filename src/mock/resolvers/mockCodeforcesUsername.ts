import { ResponseResolver, MockedRequest, restContext } from "msw";
import { UserProfile } from "@features/authentication/userProfile";

const dataStore: UserProfile = {
  userId: "12345",
  userName: "kfess",
  codeforcesUsername: "",
};

const localStorageData = localStorage.getItem("dataStore");
if (localStorageData) {
  Object.assign(dataStore, JSON.parse(localStorageData));
}

export const mockFetchUserProfile: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(dataStore));
};

export const mockUpdateCodeforcesUsername: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  const requestBodyText = await req.text();
  const requestBody: UserProfile = JSON.parse(requestBodyText);
  dataStore.codeforcesUsername = requestBody.codeforcesUsername;

  localStorage.setItem("dataStore", JSON.stringify(dataStore));

  return res(ctx.status(200));
};
