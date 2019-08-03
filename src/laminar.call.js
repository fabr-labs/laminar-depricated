import { errorHandler } from "./laminar.error.js";
import { throwMissingCallerError } from "./laminar.errors.js"

export function callFn({ directive, meta }) {

  const { call: fn = throwMissingCallerError(meta), args } = directive;

  try {

    const result = fn.call(null, args);

    if (result && result.catch) {
      result.catch(error => {
        errorHandler(directive, meta);
        meta.generator.return();
      });
    }

    return result;

  } catch (error) {
    errorHandler(directive, meta);
    throw new Error(error);
  }
}