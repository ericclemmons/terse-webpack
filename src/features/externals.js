import { isString } from "lodash";
import path from "path";

export default function externals(existing = [], ...args) {
  if (!arguments.length) {
    return;
  }

  const externals = args.map((arg) => {
    if (!isString(arg)) {
      return arg;
    }

    const { dir } = path.parse(arg);

    if (dir) {
      return path.resolve(process.cwd(), arg);
    }

    return arg;
  });

  return [
    ...existing,
    ...externals,
  ];
}
