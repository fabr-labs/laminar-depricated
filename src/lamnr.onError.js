import { callFn } from './lamnr.call.js';
import { applyMiddleware } from './utilities/apply-middleware.js';

export const config = {
  unhandledError: null
}

export function onError({ directive, meta, error, tries = 3, resolved = false }) {
  if (directive.onError && tries) {
    return applyMiddleware(callFn, directive.onError)({ directive, meta, error, tries: tries -1, resolved });
  } else {
    if (config.unhandledError) config.unhandledError({ directive, meta, error, tries, resolved });
    throw new Error(error);
  }
}
