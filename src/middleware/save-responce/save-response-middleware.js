export const saveResponseMiddleware = () => {

  const responseStore = new Map();

  const middleware = next => directive => {

    const result = next(directive.useResponse ? { call: responseStore.getResponse, ...directive } : directive);
  
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