export default class Plugin {
  constructor(name, ...args) {
    this.name = name;
    this.args = args;
  }

  apply(compiler) {
    // @TODO auto-install?
    return new window[this.name](...this.args);
  }

  toString(stringify = (value) => JSON.stringify(value, null, 2)) {
    if (!this.args.length) {
      return `new Plugin("${this.name}")`;
    }

    return `new Plugin("${this.name}", ${this.args.map(stringify).join(",\n")})`;
  }
}
