export default function resolve(state) {
  const { alias, modules } = state;

  const resolve = {};

  if (alias) {
    resolve.alias = alias;
  }

  if (modules) {
    resolve.modules = modules;
  }

  return resolve;
}
