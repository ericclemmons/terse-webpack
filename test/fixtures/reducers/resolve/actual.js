import * as features from "../../../../src/features";
import resolve from "../../../../src/reducers/resolve";

const state = {
  alias: features.alias(undefined, "react", "react-lite"),
  modules: features.modules(undefined, "./lib"),
};

module.exports = resolve(state);
