export const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => (directive) => {

    if (directive.returnResponse) {
      return next(directive.returnResponse ? { ...directive, args: { [directive.returnResponse]: responseStore.get(directive.returnResponse), ...(directive.args || {}) } } : directive);
    }

    if (directive.useResponse) {
      const { useResponse, ...rest } = directive;
      return next({ ...rest, ...(useResponse(responseStore))});
    }

    const result = next(directive);
  
    if (directive.saveResponse) {
      if (result.then) {
        result.then(response => {
          responseStore.set(directive.saveResponse, response)
        });
      } else {
        responseStore.set(directive.saveResponse, result)
      }
    }
  
    return result;
  
  };

  middleware.responses = responseStore;
  return middleware;
}
