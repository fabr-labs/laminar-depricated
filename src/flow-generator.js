import { applyMiddleware } from "./utilities/apply-middleware.js";
import { MissingCallsError } from "./errors/custom-errors.js"; 

export function* flowGenerator({ flow, flowId, middleware }){

  for (let [index, step] of flow.entries()) {

    try {

      if (step.calls) {
        yield Promise.all(step.calls.map(asyncStep => applyMiddleware(({ call, args }) => call.call(this, args), middleware)(asyncStep)));
      }

      if (step.call) {
        yield applyMiddleware(({ call, args }) => call.call(this, args), middleware)(step);
      }

      if (!step.call && !step.calls) {
        throw new MissingCallsError(`A directive must contain either a 'call' property passing a single function to be called, or a 'calls' property passing an array of functions to be called asynchronously.`, { flowId, step: index });
      }

    } catch (error) {

      console.warn('CAUGHT ERROR IN APP');

      console.log(error.stack);

      // console.log(flow);

      // console.warn(step);
      throw error;
    }
  }
}