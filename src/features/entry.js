import { isObject, isString, reduce } from "lodash";
import path from "path";

const fromObject = (entries, context = process.cwd()) => {
  return Object.keys(entries).reduce((acc, key) => {
    const entry = entries[key];
    const files = Array.isArray(entry) ? entry : [ entry ];

    return {
      ...acc,
      [key]: files.map((file) => path.resolve(context, file)),
    };
  }, {});
};

const fromString = (entry, context = process.cwd()) => {
  const parsed = path.parse(entry);
  const basename = path.basename(parsed.base, parsed.ext).toLowerCase();

  return {
    [basename]: [ path.resolve(context, entry) ],
  };
};

export default function entryFeature(entries, arg) {
  if (isObject(arg)) {
    return {
      ...entries,
      ...fromObject(arg),
    };
  }

  if (isString(arg)) {
    return {
      ...entries,
      ...fromString(arg),
    };
  }

  return entries;
}
