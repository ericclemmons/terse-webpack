var terse = require("@terse/webpack");

module.exports = new terse.ClientConfig()
  .apply(require("./webpack.config.defaults"))
  .toWebpack()
;
