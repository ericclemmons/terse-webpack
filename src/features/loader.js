export default function loader(existing = {}, loader, ext = ".js", options) {
  if (!arguments.length) {
    return;
  }

  const exts = Array.isArray(ext) ? ext : [ext];

  return exts.reduce((acc, ext) => {
    const loaders = acc[ext] || [];

    return {
      ...acc,
      [ext]: [
        ...loaders,
        {
          loader,
          ...options,
        },
      ],
    };
  }, existing);
}
