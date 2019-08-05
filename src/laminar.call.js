import { onError } from "./laminar.onError.js";
import { throwMissingCallerError } from "./laminar.errors.js"

export function callFn({ directive, meta }) {

  const { call: fn = throwMissingCallerError(meta), args } = directive;

  try {

    const result = fn.call(null, args);

    if (result && result.catch) {
      result.catch(error => {
        onError({ directive, meta, error });
        meta.generator.return();
      });
    }

    return result;

  } catch (error) {
    onError({ directive, meta, error });
    throw new Error(error);
  }
}