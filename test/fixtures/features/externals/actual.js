import externals from "../../../../src/features/externals";

const existing = externals(externals(), /node_modules/);

module.exports = externals(existing, "./lib", "react");
