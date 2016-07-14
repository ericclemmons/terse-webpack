import Expression from "./Expression";
import Plugin from "./Plugin";

import { isPlainObject, isUndefined, map, reduce, repeat } from "lodash";

import * as defaultFeatures from "./features";
import * as defaultReducers from "./reducers";

const stringify = (value) => {
  const replacements = [];

  const replace = (replacement) => {
    return `__REPLACEMENT_${replacements.push(replacement) - 1}__`;
  };

  const sort = (object) => Object.keys(object).sort().reduce((sorted, key) => {
    sorted[key] = object[key];

    return sorted;
  }, {});

  const replacer = (key, value) => {
    if (value instanceof Expression) {
      return replace(value.toString());
    }

    if (value instanceof Plugin) {
      return replace(value.toString(stringify));
    }

    if (value instanceof RegExp) {
      return replace(value.toString());
    }

    return value;
  };

  const string = JSON.stringify(
    isPlainObject ? sort(value) : value,
    replacer,
    2,
  );

  return string.replace(
    /(^[\s]+)?"__REPLACEMENT_([\d]+)__"/gm,
    (match, indent = "", index) => {
      return `${indent}${replacements[index]}`
        .split("\n")
        .join(`\n${indent}`)
      ;
    },
  );
};

export const api = (userFeatures, userReducers, history = []) => {
  const features = { ...defaultFeatures, ...userFeatures };
  const reducers = { ...defaultReducers, ...userReducers };

  const getConfig = () => {
    const state = getState();
    const config = reduce(reducers, (config, reducer, name) => {
      const reduced = reducer(state);

      if (isUndefined(reduced)) {
        return config;
      }

      return {
        ...config,
        [name]: reducer(state),
      };
    }, {});

    Object.defineProperty(config, "toString", {
      value: () => stringify(config),
    });

    return config;
  };

  const getState = () => {
    const initialState = reduce(features, (acc, feature, name) => {
      const defaultValue = feature();

      if (isUndefined(defaultValue)) {
        return acc;
      }

      return {
        ...acc,
        [name]: defaultValue,
      };
    }, {});

    const state = history.reduce((acc, { name, args }) => {
      const featureState = acc[name];
      const feature = features[name];

      return {
        ...acc,
        [name]: feature(featureState, ...args),
      };
    }, initialState);

    Object.defineProperty(state, "toString", {
      value: () => stringify(state),
    });

    return state;
  };

  const when = (env, configure) => {
    const envs = Array.isArray(env) ? env : [env];
    const { NODE_ENV = "development" } = process.env;

    if (env === true || envs.indexOf(NODE_ENV) !== -1) {
      return configure(api(features, reducers, history));
    }

    return api(features, reducers, history);
  }

  return reduce(features, (acc, feature, name) => ({
    ...acc,
    [name]: (...args) => api(
      features,
      reducers,
      history.concat({ args, name }),
    ),
  }), {
    getConfig,
    getState,
    history,
    when,
  });
}

export Expression from "./Expression";
export Plugin from "./Plugin";
