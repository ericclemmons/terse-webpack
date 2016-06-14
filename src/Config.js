import { combineReducers, createStore } from "redux";
import { createAction } from "redux-actions";

import * as defaultReducers from "./reducers";

export default class Config {
  constructor(userReducers) {
    const reducers = { ...defaultReducers, ...userReducers };

    this.history = [];
    this.reducer = combineReducers(reducers);
    this.store = createStore(this.reducer);

    for (const method in reducers) {
      this[method] = (...args) => this.call(method, ...args);
    }

    // Never bundle @terse/webpack
    this.externals(function(context, request, callback) {
      if (
        context.indexOf(__dirname) === 0
        ||
        request === "@terse/webpack"
      ) {
        return callback(null, `commonjs2 ${request}`);
      }

      callback();
    });
  }

  apply(config) {
    const history = config.getHistory();

    history.map((action) => {
      const { type, payload } = action;
      const { args } = payload;

      this.call(type, ...args);
    });

    return this;
  }

  call(type, ...args) {
    const action = createAction(type);
    const { store } = this;

    // Store pure version of the action
    this.history.push({
      type,
      payload: {
        args,
      },
    });

    // Dispatch action with reference to local store for global state
    this.store.dispatch(action({ args, store }));

    return this;
  }

  getHistory() {
    return this.history;
  }

  getNormalized() {
    return this.store.getState();
  }

  toString() {
    return JSON.stringify(this.getNormalized(), (key, value) => {
      if (value instanceof RegExp) {
        return value.toString();
      }

      return value;
    }, 2);
  }

  toWebpack() {
    const normalized = this.getNormalized();
    const store = createStore(this.reducer, normalized);

    store.dispatch(createAction("webpack")({ normalized }));

    const config = store.getState();

    // Remove nullified reducers
    const pruned = Object.keys(config).reduce((pruned, key) => {
      if (config[key] === null) {
        return pruned;
      }

      return {
        ...pruned,
        [key]: config[key],
      }
    }, {});

    pruned.toString = () => JSON.stringify(pruned, (key, value) => {
      if (value instanceof RegExp) {
        return value.toString();
      }

      return value;
    }, 2);

    return pruned;
  }

  when(expected, configure) {
    const { env } = this.getNormalized();

    const envs = Array.isArray(env) ? env : [env];

    if (envs.indexOf(expected) !== -1) {
      configure(this);
    }

    return this;
  }
}
