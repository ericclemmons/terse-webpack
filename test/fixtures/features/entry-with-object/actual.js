import entry from "../../../../src/features/entry";

module.exports = entry(undefined, {
  client: [
    "webpack-hot-middleware/client?reload=true&timeout=2000",
    `./src/client.js`,
  ],
});
