export const pushFlowMiddleware = next => ({ directive, meta }) => {
  if (directive.pushFlow) {
    if (directive.pushFlow.flow) {
       // Manage plain object passed as push flow argument.
      return next({ directive: { call: meta.pushFlow, args: { ...directive.pushFlow, args: directive.args }, ...directive }, meta });
    } else {
      // Manage functions passed as pushFlow argument.
      return next({ directive: { call: (args) => { meta.pushFlow({ ...directive.pushFlow(args), args: directive.args }) }, ...directive  }, meta });
    }
  }
  return next({ directive, meta })
};