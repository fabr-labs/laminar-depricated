import { createWait } from "../../utilities/wait.js";

export const waitMiddleware = () => {

  const promiseStore = createWait();

  const middleware = next => ({ directive, meta }) => {
    
    const nextDirective = 
      directive.wait ?  { call: promiseStore.wait, args: { ...(directive.args || {}), ...directive.wait  }, ...directive } : 
      directive.resolveWait ? { call: promiseStore.resolveWait, args: { ...(directive.args || {}), ...directive.resolveWait  }, ...directive } : 
      directive.removeWait ? { call: promiseStore.removeWait, args: { ...(directive.args || {}), ...directive.removeWait }, ...directive } : 
      directive;

      const result = next({ directive: nextDirective, meta })
    return result;
  };

  middleware.wait = promiseStore.wait
  middleware.resolveWait = promiseStore.resolveWait;
  middleware.removeWait = promiseStore.removeWait;

  return middleware;
};