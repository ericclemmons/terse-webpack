import path from "path";
import { handleActions } from "redux-actions";

export default handleActions({
  alias: (state, action) => {
    const { args, store } = action.payload;
    const [ name, folder = `node_modules/${name}` ] = args;
    const { context } = store.getState();

    return {
      ...state,
      [name]: path.resolve(context, folder),
    };
  },

  webpack: (state) => null,
}, {})
