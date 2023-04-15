import {
  chooseRandomIndex,
  getRandomElements,
  seedBasedRandom,
} from "@helpers/random";

describe("chooseRandomIndex", () => {
  it("should return a random element from the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = chooseRandomIndex(arr);

    expect(arr).toContain(result);
  });

  it("should return undefined for an empty array", () => {
    const arr: number[] = [];
    const result = chooseRandomIndex(arr);

    expect(result).toBeUndefined();
  });
});

describe("seedBasedRandom", () => {
  it("should return the same random sequence for the same seed", () => {
    const seed = 123;
    const rng1 = seedBasedRandom(seed);
    const rng2 = seedBasedRandom(seed);

    const sequence1 = Array.from({ length: 10 }, () => rng1());
    const sequence2 = Array.from({ length: 10 }, () => rng2());

    expect(sequence1).toEqual(sequence2);
  });
});

describe("getRandomElements", () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("should return n random elements from the array", () => {
    const n = 3;
    const result = getRandomElements(arr, n);

    expect(result.length).toEqual(n);
    result.forEach((item) => {
      expect(arr).toContain(item);
    });
  });

  it("should return the same random elements for the same seed", () => {
    const n = 5;
    const rng = seedBasedRandom(123);
    const result1 = getRandomElements(arr, n, rng);
    const result2 = getRandomElements(arr, n, rng);

    expect(result1).toEqual(result2);
  });

  it("should return an empty array when n is 0", () => {
    const n = 0;
    const result = getRandomElements(arr, n);

    expect(result).toEqual([]);
  });

  it("should return the entire array when n is greater than the array length", () => {
    const n = arr.length + 1;
    const result = getRandomElements(arr, n);

    expect(result).toHaveLength(arr.length);
    expect(result.sort((a, b) => a - b)).toEqual(arr);
  });
});
