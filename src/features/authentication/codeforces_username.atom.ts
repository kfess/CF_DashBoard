import { atom, AtomEffect, DefaultValue } from "recoil";
import { RecoilAtomKeys } from "@recoil/RecoilKeys";

// automatically added to localStorage when codeforces username is updated
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

export const codeforcesUsernameState = atom<string | null>({
  key: RecoilAtomKeys.CODEFORCES_USERNAME,
  default: null,
  effects: [
    localStorageEffect<string | null>(RecoilAtomKeys.CODEFORCES_USERNAME),
  ],
});
