import { applyMiddleware } from "./utilities/apply-middleware.js";
import { MissingCallerError } from "./errors/laminar-errors.js"; 

export function* flowGeneratorFn({ flow, flowId, middleware }){

  for (let [index, step] of flow.entries()) {

    try {

      if (step.calls) {
        yield Promise.all(step.calls.map(asyncStep => applyMiddleware(({ call, args }) => call.call(this, args), middleware)(asyncStep)));
      }

      if (step.call) {
        yield applyMiddleware(({ call, args }) => call.call(this, args), middleware)(step);
      }

      if (!step.call && !step.calls) {
        throw new MissingCallerError({ flowId, step: index });
      }

    } catch (error) {
      // console.error(error.stack);


      throw error;
    }
  }
}