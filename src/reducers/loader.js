import { handleActions } from "redux-actions";

export const loader = (state, action) => {
  const { args } = action.payload;
  const [ loader, ext = ".js", options ] = args;

  const exts = Array.isArray(ext) ? ext : [ext];

  return exts.reduce((state, ext) => {
    const loaders = state[ext] || [];

    return {
      ...state,
      [ext]: [
        ...loaders,
        {
          loader,
          ...options,
        },
      ],
    };
  }, state);
};

export default handleActions({
  loader,
  webpack: (state) => null,
}, {});
