import { handleActions } from "redux-actions";

export default handleActions({
  target: (state, action) => {
    const { args } = action.payload;
    const [ target ] = args;

    return target;
  },

}, "web");
