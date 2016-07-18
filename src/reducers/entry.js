import { reduce } from "lodash";

export default function entryReducer(state) {
  const { entry } = state;

  if (entry) {
    return reduce(entry, (acc, entries, name) => {
      return {
        ...acc,
        [name]: entries,
      };
    }, {});
  }
}
