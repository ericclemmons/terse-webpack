import expect from "expect";
import fs from "fs";
import path from "path";

const fixtures = (type) => {
  const root = `${__dirname}/fixtures/${type}`;

  return fs.readdirSync(root).map((name) => {
    const folder = `${root}/${name}`;

    return { folder, name };
  });
};

describe("@terse/webpack", () => {
  describe("features", () => {
    fixtures("features").map((fixture) => {
      describe(fixture.name, () => {
        it("should match expected", () => {
          expect(
            require(`${fixture.folder}/actual`)
          ).toEqual(
            require(`${fixture.folder}/expected`)
          );
        })
      });
    });
  });

  describe("reducers", () => {
    fixtures("reducers").map((fixture) => {
      describe(fixture.name, () => {
        it("should match expected", () => {
          expect(
            require(`${fixture.folder}/actual`)
          ).toEqual(
            require(`${fixture.folder}/expected`)
          );
        })
      });
    });
  });

  describe("examples", () => {
    fixtures("examples").map((fixture) => {
      describe(fixture.name, () => {
        describe(".getState()", function() {
          it("should match expected", function() {
            expect(
              require(`${fixture.folder}/actual`).getState()
            ).toEqual(
              require(`${fixture.folder}/expected.state`)
            );
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
