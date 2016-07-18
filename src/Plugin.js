const traverse = (paths = [], root) => {
  if (!paths.length) {
    return root;
  }

  const [next, ...rest] = paths;

  if (root) {
    return traverse(rest, root[next]);
  }

  const Module = require(next);

  return traverse(rest, Module.default || Module);
};

export default class Plugin {
  constructor(name, ...args) {
    this.name = name;
    this.args = args;
  }

  apply(compiler) {
    const Instance = traverse(this.name.split("."));
    const instance = new Instance(...this.args);

    instance.apply.call(instance, compiler);

    return instance;
  }

  toString(stringify = (value) => JSON.stringify(value, null, 2)) {
    if (!this.args.length) {
      return `new terse.Plugin("${this.name}")`;
    }

    return `new terse.Plugin("${this.name}", ${this.args.map(stringify).join(",\n")})`;
  }
}
