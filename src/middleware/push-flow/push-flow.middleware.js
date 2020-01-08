/* eslint-disable prettier/prettier */
export const pushFlowMiddleware = next => ({ directive, meta }) => {
  if (directive.pushFlow) {
    if (directive.pushFlow.flow) {
      // Manage plain object passed as push flow argument.
      return next({ directive: { ...directive, call: meta.pushFlow, args: directive.pushFlow }, meta });
    }
    // Manage functions passed as pushFlow argument.
    return next({ directive: { ...directive, call: (args) => meta.pushFlow({ ...directive.pushFlow(args), args: directive.args }), ...directive  }, meta });
  }
  return next({ directive, meta })
};
