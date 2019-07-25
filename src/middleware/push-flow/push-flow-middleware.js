export const pushFlowMiddleware = next => directive => {
  const nextDirective = directive.pushFlow ? { call: directive.context.pushFlow, args: directive.pushFlow, ...directive } : directive;
  
  return next(nextDirective);;
};