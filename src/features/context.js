import path from "path";

export default function context(existing, folder = process.cwd()) {
  return path.resolve(folder);
}
