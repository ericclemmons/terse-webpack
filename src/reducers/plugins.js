export default function plugins(state) {
  const { plugin } = state;

  // @TODO this.

  return plugin;
}
// // Move this to reducers
// // Also, create `class Instance` to wrap this functionality for run-time
// import { handleActions } from "redux-actions";
//
// const traverse = (paths = [], root) => {
//   if (!paths.length) {
//     return root;
//   }
//
//   const [ next, ...rest ] = paths;
//
//   if (root) {
//     return traverse(rest, root[next]);
//   }
//
//   const Module = require(next);
//
//   return traverse(rest, Module.default || Module);
// }
//
// export default handleActions({
//   webpack: (state, action) => {
//     const { normalized } = action.payload;
//     const { plugin } = normalized;
//
//     return Object.keys(plugin).map((path) => {
//       try {
//         const Plugin = traverse(path.split("."));
//         const args = plugin[path];
//
//         return new Plugin(...args);
//       } catch(e) {
//         console.error("Could not load module " + path);
//
//         throw e;
//       }
//     });
//   },
// }, {})
