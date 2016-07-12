import externals from "../../../../src/features/externals";

const existing = [
  /node_modules/,
];

module.exports = externals(existing, "./lib", "react");
