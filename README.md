# [**Pre-release**] Terse Webpack

[![travis build](https://img.shields.io/travis/ericclemmons/terse-webpack.svg)](https://travis-ci.org/ericclemmons/terse-webpack)
[![version](https://img.shields.io/npm/v/terse-webpack.svg)](http://npm.im/terse-webpack)
[![downloads](https://img.shields.io/npm/dm/terse-webpack.svg)](http://npm-stat.com/charts.html?package=terse-webpack)
[![MIT License](https://img.shields.io/npm/l/terse-webpack.svg)](http://opensource.org/licenses/MIT)

> The best of Webpack in a simple API.

- - -

## The Problem

- [Webpack][webpack] is **powerful**, but **extremely complicated** to use.
- Once you leverage Webpack's APIs within your app
  (e.g. `require.context`, `require.ensure`, etc.),
  your server should be compiled as well.
- There are **tons** of pitfalls when using Webpack in an isomorphic application.

This project attempts to solve these with:

- **Simple, Memorable API**.
- Focus on **features, not configuration**.
- Embrace evolving best-practices.
- Abstraction for improving performance.
- **Does not replace Webpack, but _simplifies_ it.**
- Optional `.defaults()` for getting started quickly.


## Installation

Because Webpack is exceedingly complex, this project includes it to simplify
installation & reduce edge-cases.


```shell
npm install terse-webpack
```

If your project does not have a `webpack.config.client.js` yet,
you can quickly get started by running:

```shell
$(npm bin)/terse-webpack
```

Finally, once you're all setup, run `webpack` as usual:

```shell
$(npm bin)/webpack
```


## Usage

### Client

```js
// webpack.config.client.babel.js
import { ClientConfig } from "@terse/webpack";

export default new ClientConfig()
  .entry("src/client.js")
  .output("dist/client")
  .create()
;
```

### Server

```js
// webpack.config.server.babel.js
import { ServerConfig } from "@terse/webpack";

export default new ServerConfig()
  .entry("src/server.js")
  .output("dist/server")
  .create()
;
```

### License

> MIT License 2016 © Eric Clemmons

[webpack]: https://webpack.github.io/
