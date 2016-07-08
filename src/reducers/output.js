export default function outputReducer(state) {
  const { output, target } = state;

  if (output) {
    return {
      chunkFilename: "[id].[hash:5]-[chunkhash:7].js",
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
      filename: "[name].js",
      libraryTarget: target === "web" ? "var" : "commonjs2",
      publicPath: "/",
      ...output,
    };
  }
}
