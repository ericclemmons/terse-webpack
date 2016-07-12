export default function env(existing, env) {
  return env || process.env.NODE_ENV || "development";
}
