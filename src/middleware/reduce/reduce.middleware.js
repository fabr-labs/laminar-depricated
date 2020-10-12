export const reduceMiddleware = next => directive => {

  const result = next(directive);

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