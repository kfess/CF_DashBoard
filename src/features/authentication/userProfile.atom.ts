// import { atom, AtomEffect, DefaultValue } from "recoil";
// import { RecoilAtomKeys } from "@recoil/RecoilKeys";
// import { UserProfile } from "./userProfile";

// // automatically added to localStorage when session is changed
// const localStorageEffect: <T>(key: string) => AtomEffect<T> =
//   (key: string) =>
//   ({ setSelf, onSet }) => {
//     const savedValue = localStorage.getItem(key);

//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }

//     onSet((newValue) => {
//       if (newValue instanceof DefaultValue) {
//         localStorage.removeItem(key);
//       } else {
//         localStorage.setItem(key, JSON.stringify(newValue));
//       }
//     });
//   };

// export const userProfileState = atom<UserProfile | null>({
//   key: RecoilAtomKeys.USER_PROFILE,
//   default: null,
//   effects: [
//     localStorageEffect<UserProfile | null>(RecoilAtomKeys.USER_PROFILE),
//   ],
// });
