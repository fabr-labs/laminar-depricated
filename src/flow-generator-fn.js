import { applyMiddleware } from "./utilities/apply-middleware.js";
import { MissingCallerError } from "./errors/laminar-errors.js"; 
import { chainFunctions } from "./utilities/chain-functions"; 

export function* flowGeneratorFn({ flow, flowId, middleware }){

  for (let [index, step] of flow.entries()) {
    try {

      if (step.calls) {
        yield Promise.all(step.calls.map(asyncStep => applyMiddleware(({ call: fns, args }) => chainFunctions(fns, args), middleware)(asyncStep)));
      } else {
        yield applyMiddleware(({ call: fns, args }) => chainFunctions(fns, args), middleware)(step);
      }

    } catch (error) {
      // todo - handle errors.
      throw error;
    }
  }
}