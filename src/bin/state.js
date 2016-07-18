import { observable } from "mobx";

export default observable({
  ...window.__INITIAL_STATE__,

  title() {
    return `${this.name} v${this.version}`;
  },
});
