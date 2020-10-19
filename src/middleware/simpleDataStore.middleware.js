const store = new Map();

export const simpleDataStoreMiddleware = next => directive => {
  if (directive.returnData) {
    return next({
      directive: {
        ...directive,
        args: { [directive.returnData]: store.get(directive.returnData), ...(directive.args || {}) },
      },
    });
  }

  if (directive.useData) {
    const { useData, ...rest } = directive;
    return next({ ...rest, call: () => useData(store) });
  }

  const result = next(directive);

  if (directive.saveDataAs) {
    if (result.then) {
      result.then((response) => {
        store.set(directive.saveDataAs, response);
      });
    } else {
      store.set(directive.saveDataAs, result);
    }
  }

  return result;
};
