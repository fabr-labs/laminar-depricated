import { createWait } from "./wait.js";

export const promiseWaitMiddleware = () => {

  const promiseStore = createWait();

  const middleware = next => directive => {

    const result = next(directive);

    if (directive.wait) {
      return { call: promiseStore.wait, args: directive.wait };
    }

    if (directive.resolveWait) {
      return { call: promiseStore.resolveWait, args: directive.resolveWaitOn };
    }

    if (directive.removeWait) {
      return { call: promiseStore.removeWait, args: directive.removeWait};
    }

    return result;
  
  };

  middleware.wait = promiseStore.wait
  middleware.resolveWait = promiseStore.resolveWait;
  middleware.removeWait = promiseStore.removeWait;

  return middleware;
};