import { isString } from "lodash";
import path from "path";
import { handleActions } from "redux-actions";

export default handleActions({
  output: (state, action) => {
    const { args, store } = action.payload;
    const [ output ] = args;
    const { context } = store.getState();

    if (isString(output)) {
      return {
        ...state,
        path: path.resolve(context, output),
      };
    }

    // Object
    return {
      ...state,
      ...output,
    };
  },

  webpack: (state, action) => {
    const { normalized } = action.payload;
    const { target } = normalized;

    return {
      libraryTarget: target === "web" ? "var" : "commonjs2",
      publicPath: "/",
      ...state,
    };
  },
}, {
  chunkFilename: "[id].[hash:5]-[chunkhash:7].js",
  devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  filename: "[name].js",
});
