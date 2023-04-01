import * as dayjs from "dayjs";

export const groupBy = <K, V>(
  array: readonly V[] | undefined,
  getKey: (cur: V, idx: number, src: readonly V[]) => K
): [K, V[]][] => {
  if (!array) {
    return [];
  }

  return Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const list = map.get(key);
      map.set(key, list ? [...list, cur] : [cur]);
      return map;
    }, new Map<K, V[]>()),
    ([key, value]) => [key, value]
  );
};

export const formatUnixTime = (unitTime: number, simple: boolean = false) =>
  simple
    ? dayjs.unix(unitTime).format("YYYY-MM-DD")
    : dayjs.unix(unitTime).format("YYYY-MM-DD HH:mm:ss");

export const isLastYear = (unitTime: number) =>
  dayjs().year() - dayjs.unix(unitTime).year() === 1;

export const isLastMonth = (unixTime: number) => {
  const thisYear = dayjs().year();
  const thisMonth = dayjs().month();

  if (thisMonth === 0) {
    return (
      thisYear - dayjs.unix(unixTime).year() === 1 &&
      dayjs.unix(unixTime).month() === 11
    );
  } else {
    return (
      thisYear === dayjs.unix(unixTime).year() &&
      thisMonth - dayjs.unix(unixTime).month() === 1
    );
  }
};

export const range = (i: number, j: number): number[] => {
  return Array.from({ length: j - i + 1 }, (_, index) => {
    return index + i;
  });
};

export const haveDuplicateInArr = <T>(arr1: readonly T[], arr2: readonly T[]) =>
  arr1.filter((v) => arr2.includes(v)).length > 0;

export const generateUUIDv4 = (): string => {
  return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (c: any) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
