import { createWait } from "./wait.js";

export const promiseWaitMiddleware = () => {

  const promiseStore = createWait();

  return next => directive => {

    const result = next(directive);

    if (directive.waitOn) {
      return { fn: promiseStore.wait, args: { on: directive.waitOn, async: directive.async }};
    }

    if (directive.resolveWaitOn) {
      return { fn: promiseStore.resolveWait, args: { on: directive.on, async: directive.async }};
    }

    if (directive.removeWaitFor) {
      return { fn: promiseStore.removeWait, args: { on: directive.on, async: directive.async }};
    }

    return result;
  
  };
};