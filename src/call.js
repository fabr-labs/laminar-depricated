import { onError } from './onError.js';

export async function call({ id, call: fn, args, onError: errorMiddleware }, meta) {
  try {
    return await fn.call(null, args);
  } catch (error) {
    return onError({ id, fn, args, meta, error, errorMiddleware });
  }
}
