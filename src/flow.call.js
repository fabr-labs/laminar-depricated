import { errorHandler } from "./flow.error.js";

export function callFn({ directive, meta }) {

  const { call: fn, args } = directive;

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