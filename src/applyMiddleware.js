export function applyMiddleware(fn, middleware, meta) {
  return middleware.reduce((fn, middleware) => middleware(fn, meta), fn);
}
