import expect from "expect";
import * as exported from "..";

describe("@terse/webpack", function() {
  describe("exports", function() {
    it("should export BrowserConfig, middleware, and ServerConfig", function() {
      expect(Object.keys(exported)).toEqual([
        "BrowserConfig",
        "middleware",
        "ServerConfig",
      ]);
    });
  });
});
