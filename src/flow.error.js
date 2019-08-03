export function errorHandler(directive, { flow, meta, error }) {
  if (directive.onError) {
    directive.onError.forEach(handler => {
      handler({ flow, directive, meta, error })
    });
  } else {
    console.warn('Unhandled ERROR !!! ', error)
  }
}