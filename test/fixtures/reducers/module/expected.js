module.exports = {
  loaders: [
    {
      test: /\.js$/,
      loaders: [
        {
          exclude: /node_modules/,
          loader: "babel",
          query: {
            cacheDirectory: true,
          },
        },
      ],
    },
    {
      test: /\.jsx$/,
      loaders: [
        {
          exclude: /node_modules/,
          loader: "babel",
          query: {
            cacheDirectory: true,
          },
        },
      ],
    },
  ],
  preLoaders: [
    {
      test: /\.js$/,
      loaders: [
        {
          loader: "eslint",
        },
      ],
    }
  ],
};
