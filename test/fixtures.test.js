import expect from "expect";
import fs from "fs";

const fixtures = (type) => {
  const root = `${__dirname}/fixtures/${type}`;

  return fs.readdirSync(root).map((name) => {
    const folder = `${root}/${name}`;

    return { folder, name };
  });
};

describe("@terse/webpack", () => {
  describe("features", () => {
    fixtures("features").forEach((fixture) => {
      describe(fixture.name, () => {
        it("should match expected", () => {
          expect(
            require(`${fixture.folder}/actual`)
          ).toEqual(
            require(`${fixture.folder}/expected`)
          );
        });
      });
    });
  });

  describe("reducers", () => {
    fixtures("reducers").forEach((fixture) => {
      describe(fixture.name, () => {
        it("should match expected", () => {
          expect(
            require(`${fixture.folder}/actual`)
          ).toEqual(
            require(`${fixture.folder}/expected`)
          );
        });
      });
    });
  });

  describe("examples", () => {
    fixtures("examples").forEach((fixture) => {
      describe(fixture.name, () => {
        describe(".getState()", function() {
          const actual = require(`${fixture.folder}/actual`).getState();
          const expected = require(`${fixture.folder}/expected.state`);

          it("should have the correct keys", () => {
            expect(
              Object.keys(actual).sort()
            ).toEqual(
              Object.keys(expected).sort()
            );
          });

          Object.keys(actual).sort().forEach((key) => {
            describe(key, () => {
              it("should match expected", () => {
                expect(actual[key]).toEqual(expected[key]);
              });
            });
          });
        });

        describe(".getConfig()", function() {
          describe(".toString()", function() {
            it("should match expected", function() {
              expect(
                require(`${fixture.folder}/actual`).getConfig().toString(),
              ).toEqual(
                require(`${fixture.folder}/expected.string`)
              );
            });
          });
        });
      });
    });
  });
});
