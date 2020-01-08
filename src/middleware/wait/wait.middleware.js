import { createWait } from "../../utilities/wait.js";

export const waitMiddleware = () => {

  const promiseStore = createWait();

  const middleware = next => ({ directive, meta }) => {
    
    const nextDirective = 
      directive.wait ?  { ...directive, call: promiseStore.wait, args: { ...(directive.args || {}), ...directive.wait  }} : 
      directive.resolveWait ? { ...directive, call: promiseStore.resolveWait, args: { ...(directive.args || {}), ...directive.resolveWait  }} : 
      directive.removeWait ? { ...directive, call: promiseStore.removeWait, args: { ...(directive.args || {}), ...directive.removeWait }} : 
      directive;

      const result = next({ directive: nextDirective, meta })
    return result;
  };

  middleware.wait = promiseStore.wait
  middleware.resolveWait = promiseStore.resolveWait;
  middleware.removeWait = promiseStore.removeWait;

  return middleware;
};