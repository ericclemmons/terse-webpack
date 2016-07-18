import { reduce } from "lodash";

import Plugin from "../Plugin";

export default function plugins(state) {
  const { plugin } = state;

  return reduce(plugin, (acc, args, name) => ([
    ...acc,
    new Plugin(name, ...args),
  ]), []);
}
