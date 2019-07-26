export const pushFlowMiddleware = next => directive => {
  if (directive.pushFlow) {
    if (directive.pushFlow.flow) {
       // Manage plain object passed as push flow argument.
      return next({ call: directive.context.pushFlow, args: { ...directive.pushFlow, ...directive.args }, ...directive });
    } else {
      // Manage functions passed as pushFlow argument.
      return next({ call: (args) => { directive.context.pushFlow(directive.pushFlow(args)) }, ...directive  });
    }
  }
  return next(directive)
};