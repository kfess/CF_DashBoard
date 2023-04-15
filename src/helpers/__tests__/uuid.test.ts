import { generateUUIDv4 } from "@helpers/uuid";

describe("uuid-utils", () => {
  it("should generate a valid UUID v4", () => {
    const uuid = generateUUIDv4();
    const uuidRegex = new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
      "i"
    );

    expect(uuidRegex.test(uuid)).toBe(true);
  });

  it("should generate unique UUIDs", () => {
    const uuids = new Set();
    for (let i = 0; i < 1000; i++) {
      uuids.add(generateUUIDv4());
    }
    expect(uuids.size).toBe(1000);
  });
});
