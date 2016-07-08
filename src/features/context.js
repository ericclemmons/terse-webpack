import path from "path";
import { handleActions } from "redux-actions";

export default handleActions({
  context: (state, action) => {
    const { args } = action.payload;
    const [ folder ] = args;

    return path.resolve(process.cwd(), folder);
  },
}, process.cwd());
