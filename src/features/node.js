export default function node(existing, polyfills) {
  if (!arguments.length) {
    return;
  }

  return {
    ...existing,
    ...polyfills,
  };
}
