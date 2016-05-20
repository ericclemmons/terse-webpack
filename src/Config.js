import path from "path";

export class Config {
  constructor() {
    const context = process.cwd();
    const env = process.env.NODE_ENV || "development";
    const debug = ["development", "test"].indexOf(env) !== -1;

    this.options = {
      alias: {},      // [package]: folder
      context,        // Folder
      env,            // String
      debug,          // Boolean
      dest: null,     // Folder
      loader: {},     // [ext]: [ {...loader} ] ],
      src: {},        // [name]: [files]
    };
  }

  alias(pkg, folder) {
    this.options.alias[pkg] = path.resolve(this.options.context, folder);

    return this;
  }

  context(context) {
    this.options.context = context;

    return this;
  }

  create() {
    throw new Error("`Config.create` should be extended.");
  }

  debug(debug) {
    if (typeof debug === "undefined") {
      return this.options.debug;
    }

    this.options.debug = debug;

    return this;
  }

  defaults() {
    this
      .loader("babel", ".js", {
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
        },
      })
      .loader("json", ".json")
      .loader("url", [".gif", ".jpg", ".jpeg", ".png"], {
        query: {
          limit: 8192,
        },
      })
      .loader("style", ".css")
      .loader("css", ".css", {
        query: {
          localIdentName: "[name]-[local]--[hash:base64:5]",
        },
      })
    ;
  }

  dest(folder) {
    this.options.dest = folder;

    return this;
  }

  env(env) {
    if (!env) {
      return this.options.env;
    }

    this.options.env = env;

    return this;
  }

  loader(loader, extOrExts = ".js", settings = {}) {
    if (Array.isArray(extOrExts)) {
      extOrExts.forEach((ext) => this.loader(loader, ext, settings));

      return this;
    }

    const ext = extOrExts;

    if (!loader.match(/-loader$/)) {
      loader = `${loader}-loader`;
    }

    if (!this.options.loader[ext]) {
      this.options.loader[ext] = [];
    }

    if (typeof loader === "function") {
      this.options.loader[ext] = loader(this.options.loader[ext]);
    } else {
      const test = new RegExp(ext.replace(".", "\\."));

      this.options.loader[ext].push({
        loader,
        test,
        ...settings,
      });
    }

    return this;
  }

  src(src) {
    // Convert "./src/client.js" into { client: ["/.../src/client.js"] }
    if (typeof src === "string") {
      const parsed = path.parse(src);
      const basename = path.basename(parsed.base, parsed.ext).toLowerCase();

      // Arrays are best to avoid cyclical dependency issues
      src = {
        [basename]: [path.resolve(this.options.context, src)],
      };
    }

    this.options.src = src;

    return this;
  }
}
