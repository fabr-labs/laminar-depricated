import { applyMiddleware } from "./utilities/apply-middleware.js";
import { gotoStep } from "./utilities/goto-step.js"
import { callFn } from "./call-fn.js"
import { MissingCallerError } from "./errors/laminar-errors.js"; 

export function* flowGeneratorFn({ flow, flowId, goto, middleware, args, context }){
  for (let [index, directive] of goto ? gotoStep(goto, flow(args).entries()) : flow(args).entries()) {

    console.log(this.generator.return);

    const meta = { flow, flowId, context };
    try {
      if (directive.calls) {
        yield Promise.all(directive.calls.map(asyncDirective => applyMiddleware(callFn, middleware)({ directive: asyncDirective, meta })));
      } else {
        yield applyMiddleware(callFn, middleware)({ directive, meta });
      }
    } catch (error) {
      console.log('#############   ERROR CAUGHT IN FLOW GENERATOR   #####################', error);
      return;
    }
  }
}