import { applyMiddleware } from "./utilities/apply-middleware.js";
import { MissingCallerError } from "./errors/laminar-errors.js"; 

export function* flowGeneratorFn({ flow, flowId, middleware }){

  for (let [index, step] of flow.entries()) {

    try {

      if (step.calls) {
        yield Promise.all(step.calls.map(asyncStep => applyMiddleware(({ call: fn, args }) => fn.call(this, args), middleware)(asyncStep)));
      } else {
        yield applyMiddleware(({ call: fn, args }) => fn.call(this, args), middleware)(step);
      }

    } catch (error) {
      // todo - handle errors.
      throw error;
    }
  }
}