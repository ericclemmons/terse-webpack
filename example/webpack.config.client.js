module.exports = require("./webpack.config.defaults")
  .entry("./src/client.js")
  .output("build/client")
  .target("web")
  .when("development", function(api) {
    return api
      .entry({
        client: [
          "webpack-hot-middleware/client?reload=true&timeout=2000",
          "./src/client.js",
        ],
      })
    ;
  })
  .getConfig()
;
