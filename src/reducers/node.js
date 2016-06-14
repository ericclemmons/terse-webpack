import { handleActions } from "redux-actions";

export default handleActions({
  node: (state, action) => {
    const { args } = action.payload;
    const [ node ] = args;

    return {
      ...state,
      ...node,
    };
  },

  webpack: (state, action) => state,
}, {
  __filename: true,
  __dirname: true,
});
