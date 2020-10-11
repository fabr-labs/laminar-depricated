export function pushFlowMiddleware(next, meta) {
  return (directive) => {
    if (directive.pushFlow) {
      return next({ ...directive, call: meta.pushFlow, args: directive.pushFlow });
    }
    return next(directive, meta);
  };
}