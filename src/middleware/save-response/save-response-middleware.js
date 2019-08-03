export const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => ({ directive, meta }) => {

    const result = next({ directive: directive.useResponse ? { ...directive, args: { [directive.useResponse]: responseStore.get(directive.useResponse), ...(directive.args || {}) } } : directive, meta });
  
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