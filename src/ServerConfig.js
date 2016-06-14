import fs from "fs";

import Config from "./Config";

export default class ServerConfig extends Config {
  constructor(...args) {
    super(...args);

    this
      .entry("src/server.js")
      .externals(...fs.readdirSync("./node_modules"))
      .output("build/server")
      .plugin("webpack.DefinePlugin", {
        "process.env.NODE_ENV": `process.env.NODE_ENV || "development"`,
        __CLIENT__: false,
        __ENV__: `process.env.NODE_ENV || "development"`,
        __SERVER__: true,
      })
      .target("node")
      .when("development", (config) => config
        .plugin("start-server-webpack-plugin")
        .plugin("webpack.BannerPlugin", {
          banner: `require("source-map-support").install();`,
          raw: true,
        })
      )
    ;
  }
}
