export default function loaderFeature(state = {}, loader, ext = ".js", options) {
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
}
