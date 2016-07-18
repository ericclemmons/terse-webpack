import { api } from "../../../../src";

import moduleReducer from "../../../../src/reducers/module";

const state = api()
  .preLoader("eslint")
  .loader("babel", [".js", ".jsx"], {
    exclude: /node_modules/,
    query: { cacheDirectory: true },
  })
  .getState()
;

module.exports = moduleReducer(state);
