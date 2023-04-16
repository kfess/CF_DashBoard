import { atom } from "recoil";
import { RecoilAtomKeys } from "@recoil/RecoilKeys";
import { localStorageEffect } from "@recoil/localStorageEffect";
import type { UserProfile } from "@features/authentication/userProfile";

export const userProfileState = atom<UserProfile | null>({
  key: RecoilAtomKeys.USER_PROFILE,
  default: null,
  effects: [
    localStorageEffect<UserProfile | null>(RecoilAtomKeys.USER_PROFILE),
  ],
});
