var api = require("./webpack.config.defaults")
  .entry("./src/server.js")
  // @TODO Auto-installed deps aren't in node_modules (yet),
  // so let's see if this is a problem or not
  .externals(/^@?\w[a-z\-0-9\./]+$/)
  // .externals(...require("fs").readdirSync("./node_modules"))
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
;

module.exports = api.getConfig();
