export const validateResponseMiddleware = validator => next => ({ directive, meta }) => {

  const result = next({ directive, meta });

  if (directive.validate) {
    if (result.then) {
      result.then(response => {
        validate(response);
      });
    } else {
      validate(result);
    }
  }

  return result;

};