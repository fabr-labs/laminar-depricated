import { applyMiddleware } from './utilities/apply-middleware.js';
import { gotoStep } from './utilities/goto-step.js';
import { callFn } from './lamnr.call.js';

export function* flowGeneratorFn({ flow, middleware, args, goto }) {
  for (const [index, directive] of gotoStep(goto, flow(args)).entries()) {
    try {
      yield meta => applyMiddleware(callFn, middleware)({ directive, meta: { ...meta, step: index } });
    } catch (error) {
      console.warn('!!! LAMNR GENERATOR ERROR !!!', error);
      return;
    }
  }
}
