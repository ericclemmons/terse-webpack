import path from "path";
import { handleActions } from "redux-actions";

export default handleActions({
  modules: (state, action) => {
    const { args, store } = action.payload;
    const { context } = store.getState();

    const folders = args.map((folder) => {
      const { dir } = path.parse(folder);

      // e.g. "./lib" => `${context}/lib`
      if (dir) {
        return path.resolve(context, folder);
      }

      // e.g. "node_modules"
      return folder;
    })

    // Prefer newer entries
    return [
      ...folders,
      ...state,
    ];
  },

  webpack: (state) => null,
}, ["node_modules"])
