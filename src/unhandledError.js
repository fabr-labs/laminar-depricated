export const unhandledError = ({ id, args, meta, error }) => resolved => {
  if (!resolved) {
    console.table({
      message: error.message,
      flow: meta.flow.name,
      directive: id,
      args,
    });
    return Promise.reject(error);
  }
}
