import { reduce } from "lodash";

const toArray = (exts) => {
  return reduce(exts, (acc, loaders, ext) => {
    const test = new RegExp(`${ext.replace(".", "\\.")}$`);

    return [
      ...acc,
      {
        test,
        loaders,
      },
    ];
  }, []);
};

export default function moduleReducer(state) {
  const { loader, preLoader } = state;

  return {
    loaders: toArray(loader),
    preLoaders: toArray(preLoader),
  };
};
