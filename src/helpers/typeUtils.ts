import axios from "axios";

// const hasProperty = <X extends unknown, Y extends PropertyKey>(
//   obj: X | null | undefined,
//   prop: Y
// ): obj is X & Record<Y, unknown> => {
//   return Object.prototype.hasOwnProperty.call(obj, prop) ?? false;
// };

// export const hasPropertyAsType = <X extends unknown, Y extends PropertyKey, T>(
//   obj: X | null | undefined,
//   prop: Y,
//   check: { (arg: unknown): arg is T }
// ): obj is X & Record<Y, T> => {
//   return hasProperty(obj, prop) && check(obj[prop]);
// };

// export const fetchTypedValue = <T>(
//   url: string,
//   typeGuardFn: (obj: unknown) => obj is T
// ): Promise<T | undefined> =>
//   axios
//     .get(url)
//     .then((response) => response.data)
//     .then((response: unknown) =>
//       typeGuardFn(response) ? response : undefined
//     );

// export const fetchTypedArray = <T>(
//   url: string,
//   typeGuardFn: (obj: unknown) => obj is T
// ): Promise<T[]> =>
//   axios
//     .get(url)
//     .then((response) => response.data)
//     .then((response: unknown[]) => response.filter(typeGuardFn));

// export const isString = (obj: unknown): obj is string =>
//   typeof obj === "string";

// export const isNumber = (obj: unknown): obj is number =>
//   typeof obj === "number";

// export const isBoolean = (obj: unknown): obj is boolean =>
//   typeof obj === "boolean";

// export const isArray = <T>(obj: unknown): obj is T[] => Array.isArray(obj);
