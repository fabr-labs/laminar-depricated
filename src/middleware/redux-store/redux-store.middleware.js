export const reduxStoreMiddleware = store => next => ({ directive, meta }) => {

  // Handle direct dispatch.
  const result = next({ directive: directive.dispatch ? { call: () => store.dispatch(directive.dispatch), ...directive } : directive, meta });

  // Save response to store.
  if (directive.store) {
    if (result.then) {
      result.then(response => {
        store.dispatch({ type: directive.store, [directive.as || 'data']: response });
      });
    } else {
      store.dispatch({ type: directive.store, [directive.as || 'data']: result });
    }
  }

  return result;

};