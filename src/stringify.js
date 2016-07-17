import { isPlainObject } from "lodash";

import Expression from "./Expression";
import Plugin from "./Plugin";

export default function stringify(value) {
  const replacements = [];

  const replace = (replacement) => {
    return `__REPLACEMENT_${replacements.push(replacement) - 1}__`;
  };

  const sort = (object) => Object.keys(object).sort().reduce((sorted, key) => {
    sorted[key] = object[key];

    return sorted;
  }, {});

  const replacer = (key, value) => {
    if (value instanceof Expression) {
      return replace(value.toString());
    }

    if (value instanceof Plugin) {
      return replace(value.toString(stringify));
    }

    if (value instanceof RegExp) {
      return replace(value.toString());
    }

    return value;
  };

  const string = JSON.stringify(
    isPlainObject ? sort(value) : value,
    replacer,
    2,
  );

  return string.replace(
    /(^[\s]+)?"__REPLACEMENT_([\d]+)__"/gm,
    (match, indent = "", index) => {
      return `${indent}${replacements[index]}`
        .split("\n")
        .join(`\n${indent}`)
      ;
    },
  );
}
