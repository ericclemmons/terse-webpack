import { reduce } from "lodash";

export default function resolve(state) {
  const { alias, modules } = state;

  return reduce({ alias, modules }, (acc, value, key) => {
    if (value) {
      return {
        ...acc,
        [key]: value,
      };
    }

    return acc;
  });
}
