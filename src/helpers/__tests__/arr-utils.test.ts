import { groupBy, range } from "@helpers/arr-utils";

describe("utils", () => {
  describe("groupBy", () => {
    it("should group elements by key", () => {
      const input = [
        { id: 1, category: "A" },
        { id: 2, category: "B" },
        { id: 3, category: "A" },
        { id: 4, category: "C" },
      ];

      const grouped = groupBy(input, (item) => item.category);

      expect(grouped).toEqual([
        ["A", [input[0], input[2]]],
        ["B", [input[1]]],
        ["C", [input[3]]],
      ]);
    });
  });

  describe("range", () => {
    it("should generate a range of numbers", () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(range(-3, 2)).toEqual([-3, -2, -1, 0, 1, 2]);
      expect(range(3, 3)).toEqual([3]);
      expect(range(4, 1)).toEqual([]);
    });
  });
});
