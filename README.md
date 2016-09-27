# @terse/webpack

[![Join the chat at https://gitter.im/ericclemmons/terse-webpack](https://badges.gitter.im/ericclemmons/terse-webpack.svg)](https://gitter.im/ericclemmons/terse-webpack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![travis build](https://img.shields.io/travis/ericclemmons/terse-webpack.svg)](https://travis-ci.org/ericclemmons/terse-webpack)
[![version](https://img.shields.io/npm/v/@terse/webpack.svg)](http://npm.im/@terse/webpack)
[![downloads](https://img.shields.io/npm/dm/@terse/webpack.svg)](http://npm-stat.com/charts.html?package=@terse/webpack)
[![MIT License](https://img.shields.io/github/license/ericclemmons/terse-webpack.svg)](http://opensource.org/licenses/MIT)

> Webpack simplified in a **fluent API** with **presets** & an escape hatch so **you're not locked in**.

- - -

## Why?

- [Webpack][webpack] is **powerful**, but **extremely complicated**
  for newcomers to use.
- **Merging configuration objects is exceedingly difficult** and error-prone.
- Using Webpack on both the _server_ & _client_ is necessary once you
  leverage Webpack's APIs (e.g. `require.context`, `require.ensure`).
- There are **tons** of configuration pitfalls that can negatively impact
  your build that you shouldn't have to know about.
- It's a full-time job **keeping up-to-date** with the latest build optimizations.
- **Most React boilerplates have similar configuration**,
  but no abstraction for composition.

## Why _Not_?

- You're comfortable with Webpack configuration.
- You consider abstraction bad (e.g. "magic" or "indirection").
- You have to get access to the "bare-metal" APIs.
- _TODO - Check Twitter for more cynical responses._

## How?

This project attempts to solve these problems via:

- Built on **Webpack2**, with the latest advancements.
- **Simple, fluent API** that takes the guess-work out.
- **Escape hatch** to copy/paste the generated, raw config.
- Optional `.presets` for **getting started quickly**.
- Functional reducers that you can override to customize the output.
- **Each action creates a new config**, so you can easily compose them.

**Upcoming features**:

- `.presets`:
  - `.autoinstall()` - Install missing dependencies.
  - `.conventions()` - Default input & output sources.
  - `.hot()` - Simplify HMR.
  - `.offline()` - Add offline support to your app.
  - `.react()` - Quickly get started with React.
- `terse-webpack` CLI - Start coding without any initialization.
- GUI - Get started on a new project with a few clicks.

## Example

```js
// webpack.config.js
module.exports = require("@terse/webpack").api()
  .entry("./src/client.js")
  .loader("babel", ".js", {
    exclude: /node_modules/,
    query: { cacheDirectory: true },
  })
  .modules("./lib")
  .output("build/client")
  .target("web")
  .when("development", function(api) {
    return api
      .entry({
        client: [
          "webpack-hot-middleware/client?reload=true&timeout=2000",
          "./src/client.js",
        ],
      })
      .plugin("npm-install-webpack-plugin")
      .plugin("webpack.HotModuleReplacementPlugin")
      .plugin("webpack.NoErrorsPlugin")
      .sourcemap("source-map")
    ;
  })
  .getConfig()
;
```

1. Generates `client.js` in the build directory from `./src/client.js`.
2. Parses `.js` files (excluding `node_modules`) with Babel.
3. Searches `node_modules` and `./lib` for non-relative files.
4. Outputs assets to `./build/client`.
5. Target platform is `web` (vs. `node`).
6. When `NODE_ENV` is `development`:
  a. Override `client.js` to support HMR.
  b. Add `npm-install-webpack-plugin` to auto-install missing dependencies.
  c. Add HMR support.
  d. Enable `source-map`-style source maps (e.g. `.map` files).


## Dependencies

_I recommend using this against the latest Node + NPM v3._

- [Node](http://nodejs.org/)
- [nvm](https://github.com/creationix/nvm)

## Installation

```shell
npm install @terse/webpack
```

## Usage

_[View the example](/example)_.

Replace the contents of `webpack.config.js` (and others) with:

  ```js
  module.exports = require("@terse/webpack").api()
    ...
    .getConfig()
  ;
  ```

It's **crucial** to call `.getConfig()` to return the Webpack configuration.

With the **upcoming `.presets`**, it'll be as simple as:

```js
module.exports = require("@terse.webpack").api()
  .presets("autoinstall", "hot", "react", "offline")
  .target("web")
  .getConfig()
;
```

## API

- `.api([customFeatures[, customReducers]])`

  > Begins fluent interface, optionally accepted an array of custom features
  > and custom reducers.

- `.alias(name[, pathOrName])`

  > Maps a package name (e.g. `react`) to another library
  > (e.g. `react-lite`) or to a path (e.g. `./node_modules/react`).

- `.context(path)`

  > Config files are relative to this folder. (Default: `process.cwd()`)

- `.env(environment)`

  > Overrides `NODE_ENV` (defaults to `development`) the build is for.

- `.externals(...[Function, RegExp, String])`

  > Prevents Webpack from bundling matching resources.

- `.loader(name[, extensions = ".js"[, options]])`

  > Add a loader for the given extension(s) with the given settings.

- `.modules(path)`

  > Lookup non-relative (e.g. `my-cool-lib`) modules in this folder
  > as well as `node_modules`.

- `.node(options)`

  > Override built-in Node constants & libs (e.g. `__dirname`, `__filename`)

- `.output(pathOrOptions)`

  > Set the output path, or specify the entire Webpack output configuration.

- `.plugin(name, ...args)`

  > Installed automatically with the given arguments.

- `.preLoader(name[, extensions = ".js"[, options]])`

  > Just like `.loader`, but is ran before all other loaders.

- `.sourcemap(type)`

  > Add a source map to the build.

- `.target(runtime)`

  > Either `node` or `web`.

- `.getConfig()`

  > Returns the Webpack configuration

  - `.toString()`

    > Returns the Webpack configuration as a string.

- `.getState()`

  > Returns the normalized configuration (prior to reducing).

  - `.toString()`

    > Returns a string of the normalized configuraiton.

### License

> MIT License 2016 © Eric Clemmons

[webpack]: https://webpack.github.io/
