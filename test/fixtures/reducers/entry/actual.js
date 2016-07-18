import entry from "../../../../src/reducers/entry";

module.exports = entry({
  entry: {
    client: [
      "webpack-hot-middleware/client?reload=true&timeout=2000",
      "./src/client.js",
    ],
  },
});
