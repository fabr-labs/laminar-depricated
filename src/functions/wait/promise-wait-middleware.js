import { createWait } from "./wait.js";

export const promiseWaitMiddleware = () => {

  const promiseStore = createWait();

  return next => directive => {

    const result = next(directive);

    if (directive.waitOn) {
      return { call: promiseStore.wait, args: { on: directive.waitOn, async: directive.async }};
    }

    if (directive.resolveWaitOn) {
      return { call: promiseStore.resolveWait, args: { on: directive.on, async: directive.async }};
    }

    if (directive.removeWaitFor) {
      return { call: promiseStore.removeWait, args: { on: directive.on, async: directive.async }};
    }

    return result;
  
  };
};