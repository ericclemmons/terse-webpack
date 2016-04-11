import path from "path";
import webpack from "webpack";

import { Config } from "./Config";

export class BrowserConfig extends Config {
  create() {
    const { alias, context, env, debug, dest, loader, src } = this.options;

    const cache = debug;
    const devtool = debug ? "inline-sourcemap" : null;

    const entry = Object.keys(src).reduce((acc, name) => {
      const files = debug ? [
        "webpack-hot-middleware/client?reload=true",
      ] : [];

      return {
        ...acc,
        [name]: files.concat(src[name]),
      };
    }, {});

    const loaders = Object.keys(loader).reduce((acc, ext) => {
      const extLoaders = loader[ext];

      return [
        ...acc,
        ...extLoaders,
      ];
    }, []);

    const node = {
      __dirname: true,
      __filename: true,
    };

    const output = {
      chunkFilename: "[id].[hash:5]-[chunkhash:7].js",
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
      filename: "[name].js",
      libraryTarget: "var",
      path: path.resolve(context, dest),
      publicPath: "/",
    };

    const plugins = [
      new webpack.DefinePlugin({
        // Useful for browser-only logic
        __BROWSER__: true,
        // Useful for removing server-only code
        __SERVER__: true,
        // Environment at compile-time
        __STAGE__: JSON.stringify(env),
        // For accurate minification, NODE_ENV is based on debug
        "process.env.NODE_ENV": JSON.stringify(debug ? "development" : "production"),
      }),
    ];

    if (debug) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      );
    } else {
      plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
      );
    }

    const resolve = {
      alias,
      root: [
        path.resolve(context, "./lib"),
      ],
    };

    const target = "web";

    return {
      cache,
      context,
      debug,
      devtool,
      entry,
      module: {
        loaders,
      },
      node,
      output,
      plugins,
      resolve,
      target,
    };
  }
}
