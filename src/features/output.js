import { isPlainObject, isString } from "lodash";
import path from "path";

export default function outputFeature(existing, output) {
  if (isPlainObject(output)) {
    return {
      ...existing,
      ...output,
    };
  }

  if (isString(output)) {
    return {
      ...existing,
      path: path.resolve(process.cwd(), output),
    };
  }

  return existing;
}
