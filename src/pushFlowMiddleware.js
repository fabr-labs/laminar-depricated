export function pushFlowMiddleware(next, meta) {

  return (directive) => {
    if (directive.pushFlow) {
      return next({ ...directive, call: meta.pushFlow, args: directive.pushFlow });
    }

    // This passes the meta object as the last middleware in the array to the caller function. 

    return next(directive, meta);
  };
}