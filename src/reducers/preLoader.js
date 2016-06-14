import { handleActions } from "redux-actions";

import { loader } from "./loader";

export default handleActions({
  preLoader: loader,
  webpack: (state) => null,
}, {});
