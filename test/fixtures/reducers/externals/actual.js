import { api } from "../../../../src";
import externals from "../../../../src/reducers/externals";

const state = api()
  .externals(/node_modules/)
  .externals("./lib", "react")
  .getConfig()
;

module.exports = externals(state, "./lib", "react");
