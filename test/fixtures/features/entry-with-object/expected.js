module.exports = {
  client: [
    "webpack-hot-middleware/client?reload=true&timeout=2000",
    `${process.cwd()}/src/client.js`,
  ],
};
