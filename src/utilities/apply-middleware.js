export function applyMiddleware(fn, middlewares) {
  return middlewares.reduce((fn, middleware) => middleware(fn), fn);
}