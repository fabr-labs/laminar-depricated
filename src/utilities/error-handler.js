export function errorHandler(directive, { flow, flowId, context, error }) {
  if (directive.onError) {
    directive.onError.forEach(handler => {
      handler({ flow, flowId, directive, context, error })
    });
  } else {
    console.warn('Unhandled ERROR !!! ', error)
  }
}