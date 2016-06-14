import { handleActions } from "redux-actions";

export default handleActions({
  devtool: (state, action) => {
    const { args } = action.payload;
    const [ sourcemap ] = args;

    return sourcemap;
  },
}, null);
