export function applyMiddleware(call, middlewares) {
  return middlewares.reduce((call, middleware) => middleware(call), call);
}