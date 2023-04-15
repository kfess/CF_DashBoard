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

export const range = (i: number, j: number): number[] => {
  return Array.from({ length: j - i + 1 }, (_, index) => {
    return index + i;
  });
};

export const haveDuplicateInArr = <T>(arr1: readonly T[], arr2: readonly T[]) =>
  arr1.filter((v) => arr2.includes(v)).length > 0;
