import { createWait } from "../../utilities/wait.js";

export const waitMiddleware = () => {

  const promiseStore = createWait();

  const middleware = next => directive => {
    const nextDirective = 
      directive.wait ?  { call: promiseStore.wait, args: directive.wait, ...directive } : 
      directive.resolveWait ? { call: promiseStore.resolveWait, args: directive.resolveWait, ...directive } : 
      directive.removeWait ? { call: promiseStore.removeWait, args: directive.removeWait, ...directive } : 
      directive;

      const result = next(nextDirective)
    return result;
  };

  middleware.wait = promiseStore.wait
  middleware.resolveWait = promiseStore.resolveWait;
  middleware.removeWait = promiseStore.removeWait;

  return middleware;
};