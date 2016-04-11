import fs from "fs";
import path from "path";
import webpack from "webpack";

import { Config } from "./Config";

export class ServerConfig extends Config {
  create() {
    const { alias, context, debug, dest, loader, src } = this.options;

    const cache = debug;
    const devtool = debug ? "inline-sourcemap" : null;

    const entry = Object.keys(src).reduce((acc, name) => {
      const files = debug ? [
        "webpack/hot/poll?1000",
      ] : [];

      return {
        ...acc,
        [name]: files.concat(src[name]),
      };
    }, {});

    const externals = fs.readdirSync(path.resolve(context, "node_modules"));

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
      libraryTarget: "commonjs2",
      path: path.resolve(context, dest),
    };

    const plugins = [
      new webpack.DefinePlugin({
        // Useful for removing browser-only code
        __BROWSER__: false,
        // Useful for server-only logic
        __SERVER__: true,
        // Determine environment at runtime, not compile time
        __STAGE__: 'process.env.NODE_ENV || "development"',
      }),
    ];

    if (debug) {
      const StartServerPlugin = require("start-server-webpack-plugin").default;

      plugins.push(
        new webpack.BannerPlugin(
          'require("source-map-support").install();',
          { raw: true, entryOnly: false },
        ),
        new StartServerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      );
    }

    const preLoaders = debug ? [
      {
        exclude: /node_modules/,
        loader: "eslint-loader",
        test: /\.js$/,
      },
    ] : [];

    const resolve = {
      alias,
      root: [
        path.resolve(context, "./lib"),
      ],
    };

    const target = "node";

    return {
      cache,
      context,
      debug,
      devtool,
      entry,
      externals,
      module: {
        preLoaders,
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
