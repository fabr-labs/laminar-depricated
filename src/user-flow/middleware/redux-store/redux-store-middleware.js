export const reduxStoreMiddleware = store => next => directive => {

  const result = next(directive);

  if (directive.store) {
    if (result.then) {
      result.then(response => {
        store.dispatch({ type: directive.store, data: response });
      });
    } else {
      store.dispatch({ type: directive.store, data: result });
    }
  }

  return result;

};