import { applyMiddleware } from './applyMiddleware.js';
import { pushFlowMiddleware } from './pushFlowMiddleware.js';
import { unhandledError } from './unhandledError.js';

export function onError({ id, fn, args, meta, error, errorMiddleware = [], resolved = false }) {
  const middleware = [...errorMiddleware, pushFlowMiddleware].reverse();
  return applyMiddleware(unhandledError({ id, fn, args, meta, error }), middleware, {
    ...meta,
    id,
    fn,
    args,
    error,
  })(resolved);
}
