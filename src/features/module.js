import { handleActions } from "redux-actions";

const toArray = (exts) => {
  return Object.keys(exts).reduce((acc, ext) => {
    const test = new RegExp(ext.replace(".", "\\."));
    const loaders = exts[ext].map((loader) => {
      return {
        test,
        ...loader,
      };
    });

    return [
      ...acc,
      ...loaders,
    ];
  }, []);
};

export default handleActions({
  webpack: (state, action) => {
    const { normalized } = action.payload;

    return {
      preLoaders: toArray(normalized.preLoader),
      loaders: toArray(normalized.loader),
    };
  },
}, {})
