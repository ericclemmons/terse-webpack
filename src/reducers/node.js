export default function node(state) {
  const { node } = state;

  return {
    __filename: true,
    __dirname: true,
    ...node,
  };
}
