import { reduce } from "lodash";

export default function entryReducer(state) {
  const { entry, env, hot, target } = state;

  if (entry) {
    return reduce(entry, (acc, entries, name) => {
      return {
        ...acc,
        [name]: entries,
      };
    }, {});
  }
}

//   webpack: (state, action) => {
//     const { normalized } = action.payload;
//     const { env, target } = normalized;
//
//     if (env === "production") {
//       return state;
//     }
//
//     const hmr = target === "node"
//       ? "webpack/hot/poll?1000"
//       : "webpack-hot-middleware/client?reload=true"
//     ;
//
//     return reduce(state, (acc, entries, name) => {
//       return {
//         ...acc,
//         [name]: [
//           hmr,
//           ...entries,
//         ],
//       };
//     }, {});
//   },
// }, {});
