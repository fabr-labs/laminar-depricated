export function onError({ directive, meta, error }) {
  if (directive.onError) {
    directive.onError.forEach(handler => {
      handler({ directive, meta, error })
    });
  } else {
    console.warn('Unhandled ERROR !!! ', error)
  }
}