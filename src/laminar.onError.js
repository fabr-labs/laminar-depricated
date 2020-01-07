import { callFn } from './laminar.call.js';
import { applyMiddleware } from './utilities/apply-middleware.js';

export function onError({ directive, meta, error, tries = 3, resolved = false }) {
  if (directive.onError && tries) {
    return applyMiddleware(callFn, directive.onError)({ directive, meta, error, tries: tries -1, resolved });
  } else {
    console.warn('!!! UNHANDLED LAMNR ERROR !!!');
    console.warn({ directive, meta, error, tries: tries -1, resolved });
    throw new Error(error);
  }
}