module.exports = require("../../../../src").api()
  .entry("src/client.js")
  .preLoader("eslint")
  .loader("babel", ".js", {
    exclude: /node_modules/,
    query: { cacheDirectory: true },
  })
  .loader("json", ".json")
  .loader("style", ".css")
  .loader("css", ".css", {
    query: { localIdentName: "[name]-[local]--[hash:base64:5]" },
  })
  .loader("url", [".jpg", ".png"], {
    query: { limit: 8192 }, // Inline base64 URLs for <= 8K images
  })
  .output("build/client")
  .plugin("webpack.DefinePlugin", {
    __CLIENT__: true,
    __ENV__: JSON.stringify(process.env.NODE_ENV || "development"),
    __SERVER__: false,
    "process.env.NODE_ENV": JSON.stringify(
      ~[undefined, "development"].indexOf(process.env.NODE_ENV)
      ? "development"
      : "production"
    ),
  })
  .modules("./lib")
  .target("web")
  .when(["development", "test"], function(api) {
    return api
      .plugin("npm-install-webpack-plugin")
      .sourcemap("cheap-module-eval-source-map")
    ;
  })
  .when(["staging", "production"], function(api) {
    return api
      .plugin("webpack.optimize.DedupePlugin")
      .plugin("webpack.NoErrorsPlugin")
      .plugin("webpack.optimize.UglifyJsPlugin", {
        mangle: true,
        sourcemap: false,
      })
    ;
  })
;
