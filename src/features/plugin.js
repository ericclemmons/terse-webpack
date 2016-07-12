export default function pluginFeature(existing, name, ...args) {
  if (!arguments.length) {
    return;
  }

  return {
    ...existing,
    [name]: args,
  };
}
