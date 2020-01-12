
function flowStep(step) {
  return () => [
    step
  ]
}

export const promiseAllMiddleware = next => ({ directive, meta }) => {

  if (directive.all) {
    return next({ directive: { ...directive, call: () => Promise.all(directive.all.map(directive => meta.pushFlow({ flow: flowStep(directive) }))) }, meta });
  }

  return next({ directive, meta })
};