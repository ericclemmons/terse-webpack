import { isObject, isString } from "lodash";
import path from "path";

const fromObject = (entries, context = process.cwd()) => {
  return Object.keys(entries).reduce((acc, key) => {
    const entry = entries[key];
    const files = Array.isArray(entry) ? entry : [entry];

    return {
      ...acc,
      [key]: files.map((file) => {
        if (file.charAt(0) === ".") {
          return path.resolve(context, file);
        }

        return file;
      }),
    };
  }, {});
};

const fromString = (entry, context = process.cwd()) => {
  const parsed = path.parse(entry);
  const basename = path.basename(parsed.base, parsed.ext).toLowerCase();

  return {
    [basename]: [path.resolve(context, entry)],
  };
};

export default function entry(existing, arg) {
  if (isObject(arg)) {
    return {
      ...existing,
      ...fromObject(arg),
    };
  }

  if (isString(arg)) {
    return {
      ...existing,
      ...fromString(arg),
    };
  }

  return existing;
}
