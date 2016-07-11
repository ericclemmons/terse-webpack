import { reduce } from "lodash";

const toArray = (exts) => {
  return reduce((acc, loaders, ext) => {
    const test = new RegExp(ext.replace(".", "\\."));

    return {
      test,
      loaders,
    };
  }, []);
};

export default function moduleReducer(state) {
  const { loader, preLoader } = state;

  return reduce({ loader, preLoader }, (acc, value, key) => {
    if (value) {
      return {
        ...acc,
        [key]: toArray(value),
      };
    }

    // return acc;
  });
};
