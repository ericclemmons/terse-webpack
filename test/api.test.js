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
      const defaultState = {
        context: process.cwd(),
        env: process.env.NODE_ENV || "development",
        modules: ["node_modules"],
        target: "web",
      };

      it(`should return ${JSON.stringify(defaultState)}`, function() {
        expect(api().getState()).toEqual(defaultState);
      });
    });

    describe(".getConfig()", function() {
      const defaultConfig = {
        cache: true,
        module: {
          loaders: [],
          preLoaders: [],
        },
        plugins: [],
        resolve: {
          modules: ["node_modules"],
        },
        target: "web",
      };

      it(`should return ${JSON.stringify(defaultConfig)}`, function() {
        expect(api().getConfig()).toEqual(defaultConfig);
      });

      describe(".toString()", function() {
        it(`should return "${JSON.stringify(defaultConfig)}"`, function() {
          expect(api().getConfig().toString()).toEqual(JSON.stringify(defaultConfig, null, 2));
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
