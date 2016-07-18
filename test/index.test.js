import expect from "expect";
import * as exported from "../src";

describe("@terse/webpack", () => {
  describe("exports", () => {
    it("should export api", () => {
      expect(Object.keys(exported)).toEqual([
        "api",
        "Expression",
        "Plugin",
      ]);
    });
  });
});
