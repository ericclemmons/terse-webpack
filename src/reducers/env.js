import { handleActions } from "redux-actions";

export default handleActions({
  env: (state, action) => {
    const { args } = action.payload;
    const [ env ] = args;

    return env;
  },

  webpack: (state) => null,
}, process.env.NODE_ENV || "development")
