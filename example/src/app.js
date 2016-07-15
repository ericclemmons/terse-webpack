import express from "express";
// import webpack from "webpack";
//
// import config from "../webpack.config.client";
//
// const compiler = webpack(config);

export default express()
  // .use(express.static("build/client"))
  // .use(require("webpack-hot-middleware")(compiler))
  // .use(require("webpack-dev-middleware")(compiler))
  .use((req, res) => res.send(`
    <!doctype html>
    <body>
      <h1>Howdy!</h1>
      <script src="/client.js">
    </body>
  `))
;
