import preLoader from "../../../../src/features/preLoader";

module.exports = preLoader(undefined, "eslint", [".js", ".jsx"], {
  exclude: /node_modules/,
});
