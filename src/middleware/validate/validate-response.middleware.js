export const validateResponseMiddleware = validate => next => (directive) => {

  const result = next(directive);

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