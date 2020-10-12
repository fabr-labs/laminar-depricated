export function applyMiddleware(fn, middleware, meta) {
  return middleware.reverse().reduce((fn, middleware) => middleware(fn, meta), fn);
}
