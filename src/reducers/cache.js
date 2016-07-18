export default function cache(state) {
  const { env } = state;

  if (env) {
    return ["development", "test"].indexOf(env) !== -1;
  }
}
