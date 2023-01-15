import { getColorCodeFromRating } from "@features/color/ratingColor";

describe("get Color Code from rating value", () => {
  test("No Data", () => {
    expect(getColorCodeFromRating(undefined)).toBe("#000000");
  });

  test("Newbie", () => {
    expect(getColorCodeFromRating(1199)).toBe("#CCCCCC");
  });

  test("Pupil", () => {
    expect(getColorCodeFromRating(1399)).toBe("#76DEBB");
  });

  test("Specialist", () => {
    expect(getColorCodeFromRating(1599)).toBe("#76FF77");
  });

  test("Expert", () => {
    expect(getColorCodeFromRating(1899)).toBe("#AAAAFF");
  });

  test("Candidate Master", () => {
    expect(getColorCodeFromRating(2099)).toBe("#FF88FF");
  });

  test("Master", () => {
    expect(getColorCodeFromRating(2299)).toBe("#FFCC87");
  });

  test("International Master", () => {
    expect(getColorCodeFromRating(2399)).toBe("#FFBB55");
  });

  test("Grandmaster", () => {
    expect(getColorCodeFromRating(2599)).toBe("#FF7777");
  });

  test("International Grandmaster", () => {
    expect(getColorCodeFromRating(2999)).toBe("#FF3333");
  });

  test("Legendary Grandmaster", () => {
    expect(getColorCodeFromRating(3000)).toBe("#AA0100");
  });
});
