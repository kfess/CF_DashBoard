import { atom } from "recoil";
import { localStorageEffect } from "@recoil/localStorageEffect";
import type { UserInfo } from "@features/layout/userInfo";

export const searchUserState = atom<Pick<UserInfo, "handle" | "rating">>({
  key: "searchUserState",
  default: { handle: "" },
  effects: [
    localStorageEffect<Pick<UserInfo, "handle" | "rating">>("searchUser"),
  ],
});
