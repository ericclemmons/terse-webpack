import expect from "expect";
import fs from "fs";
import path from "path";

describe("@terse/webpack", function() {
  describe("fixtures", function() {
    fs.readdirSync(`${__dirname}/fixtures`).map(function(path) {
      describe(`./${path}`, function() {
        const api = require(`./fixtures/${path}/actual.js`);

        describe(".getState()", function() {
          it("should match expected", function() {
            expect(
              api.getState()
            ).toEqual(
              require(`./fixtures/${path}/expected.state.js`)
            );
          });
        });

        describe(".getConfig()", function() {
          describe(".toString()", function() {
            it("should match expected", function() {
              expect(
                api.getConfig().toString(),
              ).toEqual(
                require(`./fixtures/${path}/expected.string.js`)
              );
            });
          });
        });
      });
    });
  });
});
