import express from "express";
import webpack from "webpack";

import config from "../webpack.config.client";

const compiler = webpack(config);

export default express()
  .use(express.static("build/client"))
  .use(require("webpack-hot-middleware")(compiler))
  .use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
  }))
  .use((req, res) => res.send(`
    <!doctype html>
    <html>
      <title>@terse/webpack demo</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.1.0/css/bulma.css" />
    </html>
    <body>
      <div id="app">Loading...</div>
      <script src="/client.js"></script>
    </body>
  `))
;
