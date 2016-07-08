import { isString } from "lodash";
import path from "path";
import { handleActions } from "redux-actions";

export default handleActions({
  externals: (state, action) => {
    const { args, store } = action.payload;
    const { context } = store.getState();

    const externals = args.map((arg) => {
      if (!isString(arg)) {
        return arg;
      }

      const { dir } = path.parse(arg);

      if (dir) {
        return path.resolve(context, arg);
      }

      return arg;
    });

    return [
      ...state,
      ...externals,
    ];
  },

  webpack: (state) => state.length ? state : null,
}, [])
