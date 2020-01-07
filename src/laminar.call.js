import { onError } from "./laminar.onError.js";
import { throwMissingCallerError } from "./laminar.errors.js"

export async function callFn({ directive, meta, tries, resolved }) {

  const { call: fn = throwMissingCallerError(meta), args } = directive;

  try {
    return await fn.call(null, args);
  } catch (error) {
    return onError({ directive, meta, error, tries, resolved });
  }
}