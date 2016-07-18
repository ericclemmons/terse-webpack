import { isUndefined, reduce } from "lodash";

import * as defaultFeatures from "./features";
import * as defaultReducers from "./reducers";
import stringify from "./stringify";

export default function api(userFeatures, userReducers, history = []) {
  const features = { ...defaultFeatures, ...userFeatures };
  const reducers = { ...defaultReducers, ...userReducers };

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

  const when = (env, configure) => {
    const envs = Array.isArray(env) ? env : [env];
    const { NODE_ENV = "development" } = process.env;

    if (env === true || envs.indexOf(NODE_ENV) !== -1) {
      return configure(api(features, reducers, history));
    }

    return api(features, reducers, history);
  };

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
