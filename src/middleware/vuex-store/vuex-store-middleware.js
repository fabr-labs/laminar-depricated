export const vuexStoreMiddleware = store => next => ({ directive, meta }) => {

  const result = next({ directive, meta });

  if (directive.storeCommit) {
    if (result.then) {
      result.then(response => {
        store.commit({ type: directive.storeCommit, data: response });
      });
    } else {
      store.commit({ type: directive.storeCommit, data: result });
    }
  } else if (directive.storeDispatch) {
    if (result.then) {
      result.then(response => {
        store.dispatch({ type: directive.storeDispatch, data: response });
      });
    } else {
      store.dispatch({ type: directive.storeDispatch, data: result });
    }
  }

  return result;

};