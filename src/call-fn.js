import { errorHandler } from "./utilities/error-handler.js";

export function callFn({ directive, meta }) {

  const { call: fn, args } = directive;

  try {
    const result = fn.call(null, args);
    if (result && result.catch) {
      result.catch(error => {
        errorHandler(directive, meta);
        console.log('Throw ASYNC!!!');
        throw error;
      });
    }

    return result;
  } catch (error) {
    console.log("TRY CATCH ERROR IN callFn !!", error)
    console.log('Throw SYNC!!!');
    throw error;
  }
}