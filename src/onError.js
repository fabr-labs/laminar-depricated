import { applyMiddleware } from './applyMiddleware.js';
import { unhandledError } from './unhandledError.js';

export async function onError({ id, fn, args, meta, error, errorMiddleware, resolved = false }) {    
  if (errorMiddleware && !resolved) {
    return applyMiddleware(() => { unhandledError({ id, fn, args, meta, error }); }, errorMiddleware, meta)({ fn, error, resolved });
  } else if (!resolved) {
    unhandledError({ id, fn, args, meta, error });
  }
}
