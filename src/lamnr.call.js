import { onError } from "./lamnr.onError.js";
import { LamnrError } from "./lamnr.errors.js"

export async function callFn({ directive, meta, tries, resolved }) {
  const { call: fn = () => { throw new LamnrError('Missing call fn', { directive, meta, tries, resolved })}, args } = directive;

  try {
    return await fn.call(null, args);
  } catch (error) {
    return onError({ directive, meta, tries, resolved, error });
  }
}
