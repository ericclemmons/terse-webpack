module.exports = {
  ".css": [
    {
      loader: "style",
    },
  ],
  ".js": [
    {
      exclude: /node_modules/,
      loader: "babel",
      query: {
        cacheDirectory: true,
      },
    },
  ],

  ".jsx": [
    {
      exclude: /node_modules/,
      loader: "babel",
      query: {
        cacheDirectory: true,
      },
    },
  ],
};
