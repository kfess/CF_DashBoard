const SEARCH_USER_REGEXP = new RegExp(/^[0-9a-zA-Z_-]+$/);

export const normalizeSearchUser = (searchUser: string): string => {
  const trimmedSearchUser = searchUser.trim();
  return SEARCH_USER_REGEXP.exec(trimmedSearchUser) ? trimmedSearchUser : "";
};
