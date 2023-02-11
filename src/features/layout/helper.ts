import { normalizeSearchUser } from "./searchUser";

export const generateUrlPath = (field: string, userID: string): string => {
  userID = normalizeSearchUser(userID);
  return userID.length > 0 ? field + `?userId=${userID}` : field;
};

export const isMainField = (path: string) =>
  path.split("/")[1] === "" ||
  path.split("/")[1] === "problems" ||
  path.split("/")[1] === "recommend" ||
  path.split("/")[1] === "achievement" ||
  path.split("/")[1] === "submission";
