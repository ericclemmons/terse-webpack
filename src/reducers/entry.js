import { isObject, isString, reduce } from "lodash";
import path from "path";
import { handleActions } from "redux-actions"

const fromAction = ({ payload }) => {
  const { args, store } = payload;
  const { context } = store.getState();

  return args.reduce((acc, entry) => {
    if (isObject(entry)) {
      return {
        ...acc,
        ...fromObject(entry, context),
      };
    }

    if (isString(entry)) {
      return {
        ...acc,
        ...fromString(entry, context),
      };
    }
  }, {});
};

const fromObject = (entries, context = process.cwd()) => {
  return Object.keys(entries).reduce((acc, key) => {
    const entry = entries[key];
    const files = Array.isArray(entry) ? entry : [ entry ];

    return {
      ...acc,
      [key]: files.map((file) => path.resolve(context, file)),
    };
  }, {});
};

const fromString = (entry, context = process.cwd()) => {
  const parsed = path.parse(entry);
  const basename = path.basename(parsed.base, parsed.ext).toLowerCase();

  return {
    [basename]: [ path.resolve(context, entry) ],
  };
};

export default handleActions({
  entry: (state, action) => {
    return {
      ...state,
      ...fromAction(action),
    };
  },

  webpack: (state, action) => {
    const { normalized } = action.payload;
    const { env, target } = normalized;

    if (env === "production") {
      return state;
    }

    const hmr = target === "node"
      ? "webpack/hot/poll?1000"
      : "webpack-hot-middleware/client?reload=true"
    ;

    return reduce(state, (acc, entries, name) => {
      return {
        ...acc,
        [name]: [
          hmr,
          ...entries,
        ],
      };
    }, {});
  },
}, {});
