
function flowStep(directive) {
  return () => [
    directive
  ]
}

export const promiseAllMiddleware = (next, meta) => directive => {

  if (directive.all) {
    return next({ ...directive, call: () => Promise.all(directive.all.map(directive => meta.pushFlow({ flow: flowStep(directive) })))});
  }

  return next(directive)
};