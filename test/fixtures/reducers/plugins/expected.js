import Plugin from "../../../../src/Plugin";

module.exports = [
  new Plugin("npm-install-webpack-plugin"),
  new Plugin("webpack.DefinePlugin", {
    "process.env.NODE_ENV": "development",
  }),
];
