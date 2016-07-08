import { handleActions } from "redux-actions";

const initialState = [
  undefined,
  "development",
  "test",
].indexOf(process.env.NODE_ENV) !== -1;

export default handleActions({
  webpack: (state, action) => {
    return state;
  },
}, initialState);
