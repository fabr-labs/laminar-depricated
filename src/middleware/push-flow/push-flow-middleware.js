export const pushFlowMiddleware = next => directive => {
  if (directive.pushFlow) {
    if (directive.pushFlow.flow) {
       // Manage plain object passed as push flow argument.
      return next({ call: directive.context.pushFlow, args: { ...directive.pushFlow, args: directive.args }, ...directive });
    } else {
      // Manage functions passed as pushFlow argument.
      return next({ call: (args) => { directive.context.pushFlow({ ...directive.pushFlow(args), args: directive.args }) }, ...directive  });
    }
  }
  return next(directive)
};