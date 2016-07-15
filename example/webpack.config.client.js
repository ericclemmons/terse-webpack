module.exports = require("./webpack.config.defaults")
  .entry("./src/client.js")
  .output("build/client")
  .target("web")
  .getConfig()
;
