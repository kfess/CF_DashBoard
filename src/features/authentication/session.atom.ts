import { atom, AtomEffect, DefaultValue } from "recoil";
import { RecoilAtomKeys } from "@recoil/RecoilKeys";

export type SessionData = {
  readonly sessionId: string;
  readonly user: {
    readonly id: string;
    readonly name: string;
  };
};

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

export const seissionDataState = atom<SessionData | null>({
  key: RecoilAtomKeys.SESSION_DATA,
  default: null,
  effects: [
    localStorageEffect<SessionData | null>(RecoilAtomKeys.SESSION_DATA),
  ],
});
