import loader from "../../../../src/features/loader";

const existing = loader(loader(), "style", ".css");
module.exports = loader(existing, "babel", [".js", ".jsx"], {
  exclude: /node_modules/,
  query: { cacheDirectory: true },
});
