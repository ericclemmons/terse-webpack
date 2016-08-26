module.exports = {
  "context": process.cwd(),
  "entry": {
    "client": [
      `${process.cwd()}/src/client.js`,
    ],
  },
  "env": process.env.NODE_ENV || "development",
  "loader": {
    ".js": [
      {
        "loader": "babel",
        "exclude": /node_modules/,
        "query": {
          "cacheDirectory": true,
        },
      },
    ],
    ".json": [
      {
        "loader": "json",
      },
    ],
    ".css": [
      {
        "loader": "style",
      },
      {
        "loader": "css",
        "query": {
          "localIdentName": "[name]-[local]--[hash:base64:5]",
        },
      },
    ],
    ".jpg": [
      {
        "loader": "url",
        "query": {
          "limit": 8192,
        },
      },
    ],
    ".png": [
      {
        "loader": "url",
        "query": {
          "limit": 8192,
        },
      },
    ],
  },
  "modules": [
    `${process.cwd()}/lib`,
    "node_modules",
  ],
  "output": {
    "path": `${process.cwd()}/build/client`,
  },
  "plugin": {
    "webpack.DefinePlugin": [
      {
        "__CLIENT__": true,
        "__ENV__": JSON.stringify(process.env.NODE_ENV || "development"),
        "__SERVER__": false,
        "process.env.NODE_ENV": JSON.stringify(
          ~[undefined, "development"].indexOf(process.env.NODE_ENV)
          ? "development"
          : "production"
        ),
      },
    ],
    "npm-install-webpack-plugin": [],
  },
  "preLoader": {
    ".js": [
      {
        "loader": "eslint",
      },
    ],
  },
  "sourcemap": "cheap-module-eval-source-map",
  "target": "web",
};
