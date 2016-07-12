import plugin from "../../../../src/features/plugin";

const existing = undefined;

module.exports = plugin(existing, "webpack.DefinePlugin", {
  "process.env.NODE_ENV": "testing",
});
