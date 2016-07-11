module.exports = require("../../../../src").api()
  .entry("./src/client.js")
  .entry({ widget: "./src/widget.js" })
;
