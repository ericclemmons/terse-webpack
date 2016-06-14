import webpack from "webpack";

export default function middleware(module, config, callback) {
  const express = require("express");
  const hot = require("express-hot-middleware");

  const compiler = webpack(config);
  const router = express.Router();

  if (module.hot) {
    router
      .use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: "/",
        quiet: false,
      }))
      .use(require("webpack-hot-middleware")(compiler))
    ;

    if (callback) {
      router.use(hot(module, callback));
    }
  }

  return router;
}
