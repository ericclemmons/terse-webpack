import express from "express";
import hot from "express-hot-middleware";
import webpack from "webpack";

export function middleware(module, config, callback) {
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
