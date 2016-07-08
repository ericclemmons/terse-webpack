import { isPlainObject, isString } from "lodash";
import path from "path";

export default function outputFeature(state, output) {
  if (isPlainObject(output)) {
    return {
      ...state,
      ...output,
    };
  }

  if (isString(output)) {
    return {
      ...state,
      path: path.resolve(process.cwd(), output),
    };
  }

  return state;
}
