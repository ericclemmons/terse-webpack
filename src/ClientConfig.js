import Config from "./Config";

export default class ClientConfig extends Config {
  constructor(...args) {
    super(...args);

    this
      .entry("src/client.js")
      .output("build/client")
      .plugin("webpack.DefinePlugin", {
        __CLIENT__: true,
        __ENV__: JSON.stringify(process.env.NODE_ENV || "development"),
        __SERVER__: false,
        "process.env.NODE_ENV": JSON.stringify(
          ~[undefined, "development"].indexOf(process.env.NODE_ENV)
            ? "development"
            : "production"
          ),
      })
      .target("web")
      .when(["staging", "production"], (config) => config
        .plugin("webpack.optimize.DedupePlugin")
        .plugin("webpack.optimize.UglifyJsPlugin", {
          mangle: true,
          sourcemap: false,
        })
      )
    ;
  }
}
