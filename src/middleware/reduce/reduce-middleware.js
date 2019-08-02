export const reduceMiddleware = next => ({ directive, meta }) => {

  const result = next({ directive, meta });

  if (directive.reduce) {
    if (result.then) {
      return result.then(response => {
        return directive.reduce(response);
      });
    } else {
      return directive.reduce(result);
    }
  }
  return result;
};