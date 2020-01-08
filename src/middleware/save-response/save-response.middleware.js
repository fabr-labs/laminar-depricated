export const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => ({ directive, meta }) => {

    if (directive.returnResponse) {
      return next({ directive: directive.returnResponse ? { ...directive, args: { [directive.returnResponse]: responseStore.get(directive.returnResponse), ...(directive.args || {}) } } : directive, meta });
    }

    if (directive.useResponse) {
      const { useResponse, ...rest } = directive;
      return next({ directive: { ...rest, ...(useResponse(responseStore))}, meta });
    }

    const result = next({ directive, meta });
  
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