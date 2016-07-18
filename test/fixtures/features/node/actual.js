import node from "../../../../src/features/node";

const existing = { __dirname: false };

module.exports = node(existing, { __filename: true });
