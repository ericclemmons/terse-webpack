import expect, { createSpy } from "expect";

import { api } from "../src";
import * as defaultFeatures from "../src/features";

const featureNames = Object.keys(defaultFeatures);

describe("@terse/webpack", function() {
  describe(".api()", function() {
    it("should expose .getConfig()", function() {
      expect(api()).toIncludeKey("getConfig");
    });

    it("should expose .getState()", function() {
      expect(api()).toIncludeKey("getState");
    });

    it("should expose .history", function() {
      expect(api()).toIncludeKey("history");
    });

    it(`should expose default features: ${featureNames}`, function() {
      expect(api()).toIncludeKeys(featureNames);
    });


    describe(".getState()", function() {
      it("should return {}", function() {
        expect(api().getState()).toEqual({
          env: defaultFeatures.env(),
        });
      });
    });

    describe(".getConfig()", function() {
      it("should return {}", function() {
        expect(api().getConfig()).toEqual({});
      });

      describe(".toString()", function() {
        it(`should return "{}"`, function() {
          expect(api().getConfig().toString()).toEqual("{}");
        });
      });
    });

    describe(".history", function() {
      it("should return []", function() {
        expect(api().history).toEqual([]);
      });
    });

    context("with { mock }", function() {
      beforeEach(function() {
        this.mock = createSpy();
        this.api = api({ mock: this.mock });
      });

      it("should expose .mock()", function() {
        expect(this.api).toIncludeKey("mock");
      });
    });
  });
});
