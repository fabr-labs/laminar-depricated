import { applyMiddleware } from "../utilities/apply-middleware.js";
import { MissingFnsError } from "./errors/custom-errors.js"; 

export function* flowGenerator({ flow, middleware }){

  for (let [index, step] of flow.entries()) {

    try {

      if (step.fns) {
        yield Promise.all(step.fns.map(asyncStep => applyMiddleware(({ fn, args }) => fn(args), middleware)(asyncStep)));
      }

      if (step.fn) {
        yield applyMiddleware(({ fn, args }) => fn(args), middleware)(step);
      }

      if (!step.fn && !step.fns) {
        throw new MissingFnsError(`A directive must contain either a 'fn' property passing a single function to be called, or a 'fns' property passing an array of functions to be called asynchronously.`, { flowID: flow.id, stepIndex: index  });
      }

    } catch (error) {
      console.warn(step);
      throw error;
    }
  }
}