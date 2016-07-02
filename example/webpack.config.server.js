var terse = require("@terse/webpack");

module.exports = new terse.ServerConfig()
  .apply(require("./webpack.config.defaults"))
  .toWebpack()
;
