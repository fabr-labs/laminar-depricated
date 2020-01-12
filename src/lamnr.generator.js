import { applyMiddleware } from './utilities/apply-middleware.js';
import { gotoStep } from './utilities/goto-step.js';
import { callFn } from './lamnr.call.js';

export function* flowGeneratorFn({ flow, middleware, args, goto }) {
  for (const [index, directive] of gotoStep(goto, flow(args)).entries()) {
    yield meta => applyMiddleware(callFn, middleware)({ directive, meta: { ...meta, flow, index } });
  }
}
