import { api } from "../../../../src";
import plugins from "../../../../src/reducers/plugins";

const state = api()
  .plugin("npm-install-webpack-plugin")
  .plugin("webpack.DefinePlugin", {
    "process.env.NODE_ENV": "development",
  })
  .getState()
;

module.exports = plugins(state);
