export const reduxStoreMiddleware = store => next => directive => {

  const result = next(directive);

  if (directive.store) {
    if (result.then) {
      result.then(response => {
        store.dispatch({ type: directive.store, [directive.as || 'data']: response });
      });
    } else {
      store.dispatch({ type: directive.store, [directive.as || 'data']: result });
    }
  }

  if (directive.dispatch) {
    return { call: () => store.dispatch(directive.dispatch), ...directive }
  }

  return result;

};