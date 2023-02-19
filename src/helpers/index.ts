import * as dayjs from "dayjs";

export const groupBy = <K, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
): [K, V[]][] =>
  Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const list = map.get(key);
      if (list) {
        list.push(cur);
      } else {
        map.set(key, [cur]);
      }
      return map;
    }, new Map<K, V[]>())
  );

export const formatUnixTime = (unitTime: number) =>
  dayjs.unix(unitTime).format("YYYY-MM-DD HH:mm:ss");

export const range = (i: number, j: number): number[] => {
  return Array.from({ length: j - i + 1 }, (_, index) => {
    return index + i;
  });
};

export const haveDuplicateInArr = <T>(arr1: readonly T[], arr2: readonly T[]) =>
  arr1.filter((v) => arr2.includes(v)).length > 0;
