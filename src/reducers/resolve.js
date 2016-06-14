import { handleActions } from "redux-actions";

export default handleActions({
  webpack: (state, action) => {
    const { normalized } = action.payload;
    const { alias, modules } = normalized;

    return {
      alias,
      modules,
    }
  },
}, {})
