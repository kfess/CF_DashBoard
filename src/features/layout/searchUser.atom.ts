import { atom, AtomEffect, DefaultValue } from "recoil";
import type { UserInfo } from "@features/layout/userInfo";

// automatically added to localStorage when label is added
const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const searchUserState = atom<Pick<UserInfo, "handle" | "rating">>({
  key: "searchUserState",
  default: { handle: "" },
  effects: [
    localStorageEffect<Pick<UserInfo, "handle" | "rating">>("searchUser"),
  ],
});
