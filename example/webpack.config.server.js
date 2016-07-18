module.exports = require("./webpack.config.defaults")
  .entry("./src/server.js")
  .externals(/^@?\w[a-z\-0-9\./]+$/)
  .output("build/server")
  .target("node")
  .when("development", function(api) {
    return api
      .entry({
        server: [
          "webpack/hot/poll?1000",
          "./src/server.js",
        ],
      })
      .sourcemap("source-map")
      .plugin("start-server-webpack-plugin")
      .plugin("webpack.BannerPlugin", {
        banner: `require("source-map-support").install();`,
        raw: true,
      })
    ;
  })
  .getConfig()
;
