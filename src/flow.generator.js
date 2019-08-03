import { applyMiddleware } from "./utilities/apply-middleware.js";
import { gotoStep } from "./utilities/goto-step.js"
import { callFn } from "./flow.call.js"

export function* flowGeneratorFn({ flow, middleware, args, goto }){
  for (let [index, directive] of goto ? gotoStep(goto, flow(args).entries()) : flow(args).entries()) {    
    try {
      if (directive.calls) {
        yield meta => Promise.all(directive.calls.map(asyncDirective => applyMiddleware(callFn, middleware)({ directive: asyncDirective, meta: { ...meta, step: index }})));
      } else {
        yield meta => applyMiddleware(callFn, middleware)({ directive, meta: { ...meta, step: index }});
      }
    } catch (error) {
      console.warn(error);
      return;
    }
  }
}