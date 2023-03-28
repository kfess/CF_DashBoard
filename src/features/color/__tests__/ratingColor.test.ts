import {
  getColorNameFromRating,
  getColorCodeFromRating,
  getColorCodeFromClassification,
  calcFillPercent,
} from "@features/color/ratingColor";

describe("getColorNameFromRating", () => {
  it("should return the correct color name for the given rating", () => {
    expect(getColorNameFromRating(1000)).toBe("Gray");
    expect(getColorNameFromRating(1300)).toBe("Green");
    expect(getColorNameFromRating(1500)).toBe("Cyan");
    expect(getColorNameFromRating(1700)).toBe("Blue");
    expect(getColorNameFromRating(2000)).toBe("Violet");
    expect(getColorNameFromRating(2200)).toBe("LightOrange");
    expect(getColorNameFromRating(2350)).toBe("DeepOrange");
    expect(getColorNameFromRating(2500)).toBe("LightRed");
    expect(getColorNameFromRating(2700)).toBe("Red");
    expect(getColorNameFromRating(3100)).toBe("DeepRed");
    expect(getColorNameFromRating(undefined)).toBe("Black");
  });
});

describe("getColorCodeFromRating", () => {
  it("should return the correct color code for the given rating", () => {
    expect(getColorCodeFromRating(1000)).toBe("#7F8081");
    expect(getColorCodeFromRating(1300)).toBe("#008000");
    expect(getColorCodeFromRating(1500)).toBe("#22AEA6");
    expect(getColorCodeFromRating(1700)).toBe("#0F06FF");
    expect(getColorCodeFromRating(2000)).toBe("#AA00AA");
    expect(getColorCodeFromRating(2200)).toBe("#E3CA0F");
    expect(getColorCodeFromRating(2350)).toBe("#FF8E0E");
    expect(getColorCodeFromRating(2500)).toBe("#FF7777");
    expect(getColorCodeFromRating(2700)).toBe("#FE0A04");
    expect(getColorCodeFromRating(3100)).toBe("#AA0100");
    expect(getColorCodeFromRating(undefined)).toBe("#1a1a1a");
  });
});

describe("getColorCodeFromClassification", () => {
  it("should return the correct color code range for the given classification", () => {
    expect(getColorCodeFromClassification("Div. 4")).toEqual([
      "#7F8081",
      "#008000",
    ]);
    expect(getColorCodeFromClassification("Div. 3")).toEqual([
      "#7F8081",
      "#22AEA6",
    ]);
    expect(getColorCodeFromClassification("Div. 2")).toEqual([
      "#0F06FF",
      "#AA00AA",
    ]);
    expect(getColorCodeFromClassification("Div. 1 + Div. 2")).toEqual([
      "#AA00AA",
      "#AA0100",
    ]);
    expect(getColorCodeFromClassification("Div. 1")).toEqual([
      "#E3CA0F",
      "#AA0100",
    ]);
  });
});

describe("calcFillPercent", () => {
  test("should return 1 for undefined rating", () => {
    expect(calcFillPercent(undefined)).toBe(1);
  });

  test("should return correct fill percent for Gray", () => {
    expect(calcFillPercent(900)).toBe(0.25);
  });

  test("should return correct fill percent for Green", () => {
    expect(calcFillPercent(1350)).toBe(0.75);
  });

  test("should return correct fill percent for Cyan", () => {
    expect(calcFillPercent(1550)).toBe(0.75);
  });

  test("should return correct fill percent for Blue", () => {
    expect(calcFillPercent(1800)).toBe(0.6666666666666667);
  });

  test("should return correct fill percent for Violet", () => {
    expect(calcFillPercent(2050)).toBe(0.75);
  });

  test("should return correct fill percent for LightOrange", () => {
    expect(calcFillPercent(2250)).toBe(0.8333333333333334);
  });

  test("should return correct fill percent for DeepOrange", () => {
    expect(calcFillPercent(2350)).toBe(0.8333333333333334);
  });

  test("should return correct fill percent for Red", () => {
    expect(calcFillPercent(2550)).toBe(0.75);
  });

  test("should return 1 for ratings above Red upper bound", () => {
    expect(calcFillPercent(3000)).toBe(1);
  });
});
