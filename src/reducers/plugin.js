import { handleActions } from "redux-actions";

export default handleActions({
  plugin: (state, action) => {
    const { args } = action.payload;
    const [ plugin, ...pluginArgs ] = args;

    return {
      ...state,
      [plugin]: pluginArgs,
    };
  },

  webpack: (state) => null,
}, {})
