import { normalizeSearchUser } from "./searchUser";

export const generateUrlPath = (field: string, userID: string): string => {
  userID = normalizeSearchUser(userID);
  return userID.length > 0 ? field + `?userId=${userID}` : field;
};
