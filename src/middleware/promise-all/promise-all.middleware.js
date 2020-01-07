
function flowStep(step) {
  return () => [
    step
  ]
}

export const promiseAllMiddleware = next => ({ directive, meta }) => {

  if (directive.promiseAll) {
    return next({ directive: { ...directive, call: () => Promise.all(directive.promiseAll.map(directive => meta.pushFlow({ flow: flowStep(directive) }))) }, meta });
  }

  return next({ directive, meta })
};