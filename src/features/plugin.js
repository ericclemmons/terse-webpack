export default function pluginFeature(state, plugin, ...args) {
  return {
    ...state,
    [plugin]: args,
  };
}
