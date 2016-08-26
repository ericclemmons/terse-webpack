module.exports = {
  loaders: [
    {
      exclude: /node_modules/,
      loader: "babel",
      test: /\.js$/,
      query: {
        cacheDirectory: true,
      },
    },
    {
      exclude: /node_modules/,
      loader: "babel",
      test: /\.jsx$/,
      query: {
        cacheDirectory: true,
      },
    },
  ],
  preLoaders: [
    {
      loader: "eslint",
      test: /\.js$/,
    },
  ],
};
