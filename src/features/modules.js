import path from "path";

export default function modulesFeature(state = ["node_modules"], ...args) {
  const folders = args.map((folder) => {
    const { dir } = path.parse(folder);

    // e.g. "./lib" => `${context}/lib`
    if (dir) {
      return path.resolve(process.cwd(), folder);
    }

    // e.g. "node_modules"
    return folder;
  })

  // Prefer newer entries
  return [
    ...folders,
    ...state,
  ];
}
