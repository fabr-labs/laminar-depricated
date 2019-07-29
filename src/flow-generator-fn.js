import { applyMiddleware } from "./utilities/apply-middleware.js";
import { MissingCallerError } from "./errors/laminar-errors.js"; 

export function* flowGeneratorFn({ flow, flowId, middleware }){

  for (let [index, directive] of flow.entries()) {
    try {

      if (directive.calls) {
        yield Promise.all(directive.calls.map(asyncDirective => applyMiddleware(({ call: fn, args }) => fn.call(this, args), middleware)(asyncDirective)));
      } else {
        yield applyMiddleware(({ call: fn, args }) => fn.call(this, args), middleware)(directive);
      }

    } catch (error) {

      if (directive.onError) {
        // yield applyMiddleware(({ call: fn, args }) => fn.call(this, args), directive.onError)(directive);
      } else {
        throw error;
      }

    }
  }
}