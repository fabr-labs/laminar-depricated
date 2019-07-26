export const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => directive => {


    if (directive.useResponse) {
      console.log(directive.useResponse);
      console.log(responseStore.get(directive.useResponse));
      console.log({ ...directive, args: { ...(directive.args || {}), [directive.useResponse]: responseStore.get(directive.useResponse) } })
    }

    const result = next(directive.useResponse ? { ...directive, args: { [directive.useResponse]: responseStore.get(directive.useResponse), ...(directive.args || {}) } } : directive);
  
    if (directive.saveResponse) {

      console.log(directive)

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